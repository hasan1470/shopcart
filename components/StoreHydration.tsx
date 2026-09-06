"use client";
import { useEffect } from "react";
import useStore from "@/store";

export default function StoreHydration() {
  useEffect(()=>{ void useStore.persist.rehydrate(); },[]);
  return null;
}
