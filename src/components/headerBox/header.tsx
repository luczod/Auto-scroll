import { Button } from "@/include/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/include/ui/card";
import { UpdateBtn } from "./headerBtn";
import { useParams } from "react-router-dom";
import { RawMsg, toastMsg } from "../flashMsg";
import { useEffect } from "react";
import { useToast } from "../../include/ui/use-toast";
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
  const { station } = useParams();
  return (
    <div className="block-inline p-2 md:*:text-base">
      <Button variant="red" size="lg">
        <a href={`/${station}?q=red`}>Deve Material</a>
      </Button>
      <Button variant="yellow" size="lg">
        <a href={`/${station}?q=yellow`}>Recebido Coletado</a>
      </Button>
      <Button variant="white" size="lg">
        <a href={`/${station}?q=white`}>Amostra na seção</a>
      </Button>
      <Button variant="purple" size="lg">
        <a href={`/${station}?q=purple`}>
          Exame faltando 45 minutos para liberação
        </a>
      </Button>

      <Button variant="maroon" size="lg">
        <a href={`/${station}?q=maroon`}>
          Passou do Prazo de 2:00 para liberação
        </a>
      </Button>

      <Button variant="orange" size="lg">
        <a href={`/${station}?q=orange`}>
          Passou do prazo de 24 horas para liberação
        </a>
      </Button>
    </div>
  );
}
