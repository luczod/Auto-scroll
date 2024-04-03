import { Button } from "@/include/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/include/ui/card";
import { UpdateBtn } from "./headerBtn";
import { useLocation } from "react-router-dom";
import { RawMsg } from "../flashMsg";
import { useEffect } from "react";
import { useToast } from "../../include/ui/use-toast";
import { Link } from "react-router-dom";
type THeader = { num?: number; horas?: string; err?: string };

const DateBrToISO = (valueData: string | undefined) => {
  const formatedA = !!valueData
    ? `${valueData.slice(6, 10)}-${valueData.slice(3, 5)}-${valueData.slice(
        0,
        2
      )}`
    : "";

  return formatedA + " " + valueData?.slice(12);
};

export function Header({ num, horas, err }: THeader) {
  const { toast } = useToast();
  useEffect(() => {
    if (!!err) {
      toast({
        variant: "error",
        description: <RawMsg text={err} kind={"error"} />,
      });
    }
  }, [toast, err]);

  return (
    <div className="flex flex-col justify-center gap-2 ">
      <Card className="w-fit flex flex-row items-center bg-slate-100 ml-2 pl-2 mt-2">
        <UpdateBtn />
        <CardHeader>
          <CardTitle>Registros encontrados {num}</CardTitle>
          <CardDescription className="text-black">
            <time dateTime={DateBrToISO(horas)}>{horas}</time>
          </CardDescription>
        </CardHeader>
      </Card>
      <HeaderFilter />
    </div>
  );
}

export function HeaderFilter() {
  // const { station } = useParams();
  const { search } = useLocation();
  return (
    <div className="block-inline p-2 md:*:text-base">
      <Button aria-pressed={search === "?q=red"} bgColor="red" size="lg">
        <Link to="?q=red" reloadDocument>
          Deve Material
        </Link>
      </Button>
      <Button aria-pressed={search === "?q=yellow"} bgColor="yellow" size="lg">
        <Link to="?q=yellow" reloadDocument>
          Recebido Coletado
        </Link>
      </Button>
      <Button aria-pressed={search === "?q=white"} bgColor="white" size="lg">
        <Link to="?q=white" reloadDocument>
          Amostra na seção
        </Link>
      </Button>
      <Button aria-pressed={search === "?q=purple"} bgColor="purple" size="lg">
        <Link to="?q=purple" reloadDocument>
          Exame faltando 45 minutos para liberação
        </Link>
      </Button>

      <Button aria-pressed={search === "?q=maroon"} bgColor="maroon" size="lg">
        <Link to="?q=maroon" reloadDocument>
          Passou do Prazo de 2:00 para liberação
        </Link>
      </Button>

      <Button aria-pressed={search === "?q=orange"} bgColor="orange" size="lg">
        <Link to="?q=orange" reloadDocument>
          Passou do prazo de 24 horas para liberação
        </Link>
      </Button>
    </div>
  );
}
