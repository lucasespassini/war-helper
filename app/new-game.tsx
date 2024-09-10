import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@rneui/themed";
import { useRouter } from "expo-router";
import { nanoid } from "nanoid/non-secure";
import React, { useEffect, useState } from "react";
import {
  FieldArrayWithId,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  UseFieldArrayRemove,
  useForm,
  useFormContext,
} from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { Item, Select } from "~/components/select";
import { Colors } from "~/constants/colors";
import { useGameStore } from "~/hooks/store/gameStore";
import { Player } from "~/types/models/player";
import { NewGameForm, newGameSchema } from "~/types/schemas/new-game-schema";

type CardPlayerFormProps = {
  field: FieldArrayWithId<NewGameForm>;
  idx: number;
  remove?: UseFieldArrayRemove;
};

const colorLabelMap = {
  black: "Preto",
  yellow: "Amarelo",
  green: "Verde",
  blue: "Azul",
  white: "Branco",
  red: "Vermelho",
};

const colors: Item[] = Colors.map((color) => ({
  value: color,
  label: colorLabelMap[color as keyof typeof colorLabelMap],
  icon: { name: "circle", color },
}));

const CardPlayerForm = ({ field, idx, remove }: CardPlayerFormProps) => {
  const [disabledColors, setDisabledColors] = useState<number[]>([]);
  const { watch } = useFormContext<NewGameForm>();
  const playerColors = watch("players").map((player) => player.color);

  useEffect(() => {
    const selectedColors = new Set(playerColors);

    const disabledIndices = colors
      .map((option, index) => (selectedColors.has(option.value) ? index : -1))
      .filter((index) => index !== -1);

    setDisabledColors((prevDisabledColors) => {
      const isSame =
        prevDisabledColors.length === disabledIndices.length &&
        prevDisabledColors.every((value, i) => value === disabledIndices[i]);

      if (!isSame) return disabledIndices;

      return prevDisabledColors;
    });
  }, [playerColors, colors]);

  return (
    <View
      key={field.id}
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Input
        name={`players.${idx}.name` as const}
        label={`Jogador ${idx + 1}`}
        placeholder="Nome"
        containerStyle={{ width: "55%" }}
      />

      <Select
        name={`players.${idx}.color` as const}
        options={colors}
        disabledOptions={disabledColors}
      />

      <Icon
        name="close"
        color="red"
        style={{ opacity: remove ? 1 : 0.3 }}
        onPress={() => remove?.(idx)}
      />
    </View>
  );
};

export default function NewGameScreen() {
  const router = useRouter();
  const startGame = useGameStore((s) => s.startGame);

  const methods = useForm<NewGameForm>({
    defaultValues: { players: [{ name: "", color: "" }] },
    resolver: zodResolver(newGameSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "players",
  });

  const errorMessage = methods.formState.errors.players?.root?.message;

  const addPlayer = () => {
    append({ name: "", color: "" });
  };

  const onSubmit: SubmitHandler<NewGameForm> = async (data) => {
    try {
      const amount_territories = 44 / data.players.length;

      const players: Player[] = data.players.map((p, idx) => ({
        id: nanoid(5),
        name: p.name,
        color: p.color,
        order: idx + 1,
        territories: amount_territories | 0,
        cards: 0,
      }));

      await startGame(players);

      router.replace("/current-game");
    } catch (error) {
      console.warn({ error });
    }
  };

  return (
    <FormProvider {...methods}>
      <ScrollView
        keyboardDismissMode="interactive"
        style={{ height: "100%", paddingVertical: 20 }}
      >
        <View style={{ height: "100%", gap: 10 }}>
          {fields.map((field, idx) => (
            <CardPlayerForm
              key={field.id}
              idx={idx}
              field={field}
              remove={fields.length > 1 ? remove : undefined}
            />
          ))}

          <View style={{ width: "100%", paddingHorizontal: 10, gap: 10 }}>
            <Button disabled={fields.length === 6} onPress={addPlayer}>
              Adicionar jogador
            </Button>
            <Button onPress={methods.handleSubmit(onSubmit)}>
              Começar{errorMessage && ` - ${errorMessage}`}
            </Button>
          </View>
        </View>
      </ScrollView>
    </FormProvider>
  );
}
