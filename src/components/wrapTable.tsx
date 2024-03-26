import { useRef } from "react";
import { DataTableDemo, TExames } from "./dataTable";
import { Header } from "./headerBox/header";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { scrollDiv, useInterval } from "./Auto_scroll";

function filterData(res: TExames[], param: string) {
  switch (param) {
    case "red":
      return res.filter(
        (item: TExames) => item.andamento === "1" && Number(item.tempo) <= 75
      );
    case "white":
      return res.filter(
        (item: TExames) =>
          Number(item.andamento) > 2 && Number(item.tempo) <= 75
      );
    case "yellow":
      return res.filter(
        (item: TExames) => item.andamento === "2" && Number(item.tempo) <= 75
      );
    case "orange":
      return res.filter((item: TExames) => Number(item.tempo) >= 1440);
    case "maroon":
      return res.filter(
        (item: TExames) =>
          Number(item.tempo) >= 120 && Number(item.tempo) < 1440
      );
    case "purple":
      return res.filter(
        (item: TExames) => Number(item.tempo) > 75 && Number(item.tempo) < 120
      );

    default:
      return res;
  }
}

export async function listarPosto(param: string, posto?: string) {
  if (posto === undefined || !Number(posto)) {
    // console.log(posto);
    const data = {
      res: [],
      err: "Posto não existe",
      horas: new Date().toLocaleString(),
    };
    return data;
  }

  const urlDev = "http://localhost:3004";
  const urlProd = import.meta.env.VITE_URL_PROD + posto;

  try {
    const req = await fetch(urlProd, {
      signal: AbortSignal.timeout(3000),
    });

    const res = await req.json();
    const filterRes = filterData(res, param);
    const data = {
      res: [...filterRes],
      err: undefined,
      horas: new Date().toLocaleString(),
    };

    return data;
  } catch (error: any) {
    const data = {
      res: [],
      err: error.message,
      horas: new Date().toLocaleString(),
    };

    return data;
  }
}

export function Wrapper() {
  const divRef = useRef<HTMLDivElement>(null);
  const [searchParams, _] = useSearchParams({ q: "all" });
  const { posto } = useParams();
  const q = searchParams.get("q") as string;

  // setInterval(() => scrollDiv(divRef), 12 * 1000);

  useInterval(() => {
    if (divRef.current?.scrollTop !== undefined) {
      scrollDiv(divRef);
    }
  }, 12 * 1000);
  // Queries
  const {
    data,
    error: msg,
    isLoading,
  } = useQuery({
    queryKey: ["exams"],
    queryFn: async () => listarPosto(q, posto),
    refetchInterval: 30 * 1000,
  });

  return (
    <>
      <Header num={data?.res.length} err={data?.err} horas={data?.horas} />
      <div
        ref={divRef}
        className="mx-2 rounded-md h-[48svh] md:h-[78dvh] scrollbar bg-white border"
      >
        <DataTableDemo data={data?.res} />
      </div>
    </>
  );
}
