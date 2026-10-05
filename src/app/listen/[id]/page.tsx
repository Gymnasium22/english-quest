"use client";

import { useParams } from "next/navigation";
import { findListening } from "@/data/listening";
import { ListeningPlayer } from "@/components/ListeningPlayer";

export default function ListenPage() {
  const { id } = useParams<{ id: string }>();
  const track = findListening(id);
  if (!track) return <p>Запись не найдена.</p>;
  return <ListeningPlayer track={track} />;
}
