import { Button } from "@/include/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/include/ui/card";
import { UpdateBtn } from "./headerBtn";
import { useLocation, useParams } from "react-router-dom";
import { RawMsg, toastMsg } from "../flashMsg";
import { useEffect } from "react";
import { useToast } from "../../include/ui/use-toast";
import { Link } from "react-router-dom";
type THeader = { num?: number; horas?: string; err?: string };

{
  /* <Button className="btn-green" size="lg">
    Aguardando integração!
  </Button> */
}

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
          <CardDescription>{horas}</CardDescription>
        </CardHeader>
      </Card>
      <HeaderFilter />
    </div>
  );
}

export function HeaderFilter() {
  // const { posto } = useParams();
  const { search } = useLocation();
  return (
    <div className="block-inline p-2 md:*:text-base">
      <Button aria-selected={search === "?q=red"} bgColor="red" size="lg">
        <Link to="?q=red" reloadDocument>
          Deve Material
        </Link>
      </Button>
      <Button aria-selected={search === "?q=yellow"} bgColor="yellow" size="lg">
        <Link to="?q=yellow" reloadDocument>
          Recebido Coletado
        </Link>
      </Button>
      <Button aria-selected={search === "?q=white"} bgColor="white" size="lg">
        <Link to="?q=white" reloadDocument>
          Amostra na seção
        </Link>
      </Button>
      <Button aria-selected={search === "?q=purple"} bgColor="purple" size="lg">
        <Link to="?q=purple" reloadDocument>
          Exame faltando 45 minutos para liberação
        </Link>
      </Button>

      <Button aria-selected={search === "?q=maroon"} bgColor="maroon" size="lg">
        <Link to="?q=maroon" reloadDocument>
          Passou do Prazo de 2:00 para liberação
        </Link>
      </Button>

      <Button aria-selected={search === "?q=orange"} bgColor="orange" size="lg">
        <Link to="?q=orange" reloadDocument>
          Passou do prazo de 24 horas para liberação
        </Link>
      </Button>
    </div>
  );
}
