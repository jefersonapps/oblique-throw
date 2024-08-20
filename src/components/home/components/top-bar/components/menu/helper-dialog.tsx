import { HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../../../../ui/button";

export function HelperDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 text-primary w-fit px-2"
        >
          <HelpCircle /> Ajuda
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-auto max-h-svh">
        <DialogHeader>
          <DialogTitle>Ajuda</DialogTitle>
          <DialogDescription className="text-justify">
            Este é um projeto que simula o lançamento de uma bolinha em um
            canhão. O usuário pode interagir com a simulação de diversas
            maneiras, alterando variáveis e observando os resultados.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <section className="space-y-3 leading-relaxed text-justify">
            <h2 className="font-semibold text-xl">Funcionalidades</h2>
            <ul className="list-disc pl-4">
              <li>Controle do lançamento</li>

              <ul className="list-disc pl-4 space-y-3">
                <li>
                  <span className="font-semibold">Ângulo Inicial:</span> Define
                  o ângulo de lançamento do canhão, o qual pode ser ajustado
                  através de um input numérico.
                </li>
                <li>
                  <span className="font-semibold">Velocidade Inicial:</span>{" "}
                  Define a velocidade da bolinha ao sair do canhão, também
                  ajustável através de um input numérico.
                </li>
                <li>
                  <span className="font-semibold">Alcance:</span> Define a
                  distância horizontal que a bolinha deve percorrer. Um alvo se
                  movimenta horizontalmente, indicando a posição em que a
                  bolinha deve cair.
                </li>
                <li>
                  <span className="font-semibold">Gravidade:</span> Permite a
                  seleção de diferentes gravidades, impactando a trajetória da
                  bolinha.
                </li>
              </ul>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
