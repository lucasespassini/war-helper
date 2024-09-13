import { Icon, Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { BattleDivider } from "~/components/battle-divider";
import { Button } from "~/components/button";
import { Dice } from "~/components/dice";
import { useGameStore } from "~/hooks/store/gameStore";
import { PlayerBattle } from "~/types/models/battle";
import { Player } from "~/types/models/player";

const CardPlayer = (player: Player) => {
  return (
    <View style={{ alignItems: "center", flexDirection: "row", gap: 10 }}>
      <Icon name="circle" color={player.color} />
      <Text style={{ fontSize: 17, fontWeight: 700 }}>{player.name}</Text>
    </View>
  );
};

type PlayerSideProps = {
  isAttacker: boolean;
  player: PlayerBattle;
};

const PlayerSide = ({ isAttacker, player }: PlayerSideProps) => {
  const [number, setNumber] = useState<number>(0);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let count = 0;

    if (isRolling) {
      intervalId = setInterval(() => {
        if (count < 5) {
          const randomNumber = Math.floor(Math.random() * 6) + 1;
          setNumber(randomNumber);
          count += 1;
        } else {
          clearInterval(intervalId!);
          setIsRolling(false);
        }
      }, 300);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRolling]);

  const throwDice = () => {
    setIsRolling(true);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        transform: isAttacker ? undefined : [{ rotate: "180deg" }],
      }}
    >
      <CardPlayer {...player.player} />

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Dice number={number} isAttacker={isAttacker} />
        <Dice number={number} isAttacker={isAttacker} />
        <Dice number={number} isAttacker={isAttacker} />
      </View>

      <Button onPress={throwDice}>Rolar Dados</Button>
    </View>
  );
};

export default function BattlefieldScreen() {
  const { attacker, defender } = useGameStore((s) => s.game.battle_history[0]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 30,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PlayerSide isAttacker={false} player={defender} />

      <View
        style={{
          paddingVertical: 10,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BattleDivider />
      </View>

      <PlayerSide isAttacker player={attacker} />
    </ScrollView>
  );
}
