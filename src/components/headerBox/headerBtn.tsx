import { UpdateIcon } from "@radix-ui/react-icons";
import { Button } from "../../include/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { listarstation } from "../wrapTable";
import { useNavigate, useParams } from "react-router-dom";

export function UpdateBtn() {
  const [pending, setPeding] = useState<boolean>(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { station } = useParams();

  async function atualizar() {
    setPeding(true);
    await queryClient.prefetchQuery({
      queryKey: ["exams"],
      queryFn: async () => listarstation("all", station),
    });

    setPeding(false);
    navigate(`/${station}`);
  }

  return (
    <>
      <Button
        type="submit"
        className="btn-blue disabled:select-none"
        onClick={atualizar}
        disabled={pending}
      >
        {pending ? "atualizando..." : "Atualizar"}
        <UpdateIcon className="ml-2 h-4 w-4" />
      </Button>
    </>
  );
}
