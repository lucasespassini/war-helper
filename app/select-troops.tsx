import { zodResolver } from "@hookform/resolvers/zod";
import { Icon, Text } from "@rneui/themed";
import { router, useLocalSearchParams } from "expo-router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { BattleDivider } from "~/components/battle-divider";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { useGameStore } from "~/hooks/store/gameStore";
import { PlayerBattle } from "~/types/models/battle";
import { Player } from "~/types/models/player";
import {
  BattlePreparationForm,
  battlePreparationSchema,
} from "~/types/schemas/battle-preparation-schema";

const CardPlayer = (player: Player) => {
  return (
    <View style={{ alignItems: "center", flexDirection: "row", gap: 10 }}>
      <Icon name="circle" color={player.color} />
      <Text style={{ fontSize: 17, fontWeight: 700 }}>{player.name}</Text>
    </View>
  );
};

export default function SelectTroopsScreen() {
  const localSearchParams = useLocalSearchParams<{
    attacker: string;
    defender: string;
  }>();

  const methods = useForm<BattlePreparationForm>({
    resolver: zodResolver(battlePreparationSchema),
  });

  const startBattle = useGameStore((s) => s.startBattle);

  const attacker: Player = JSON.parse(localSearchParams.attacker);
  const defender: Player = JSON.parse(localSearchParams.defender);

  const attacker_troops_value = methods.watch("attacker_troops");
  const defender_troops_value = methods.watch("defender_troops");

  const onSubmit: SubmitHandler<BattlePreparationForm> = async (data) => {
    const attackerBattle: Omit<PlayerBattle, "casualties"> = {
      player: attacker,
      troops: data.attacker_troops,
    };

    const defenderBattle: Omit<PlayerBattle, "casualties"> = {
      player: defender,
      troops: data.defender_troops,
    };

    await startBattle(attackerBattle, defenderBattle);

    router.replace({
      pathname: "battlefield",
      params: {
        attacker: JSON.stringify(attacker),
        defender: JSON.stringify(defender),
      },
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormProvider {...methods}>
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              width: "50%",
              alignItems: "center",
              justifyContent: "center",
              gap: 50,
            }}
          >
            <Input
              name="attacker_troops"
              label="Quantidade de tropas"
              textAlign="center"
              keyboardType="numeric"
            />

            <CardPlayer {...attacker} />

            {attacker_troops_value > 0 && defender_troops_value > 0 ? (
              <Button
                style={{ width: 500 }}
                onPress={methods.handleSubmit(onSubmit)}
              >
                Iniciar batalha
              </Button>
            ) : (
              <BattleDivider />
            )}

            <CardPlayer {...defender} />

            <Input
              name="defender_troops"
              label="Quantidade de tropas"
              textAlign="center"
              keyboardType="numeric"
            />
          </View>
        </View>
      </FormProvider>
    </ScrollView>
  );
}
