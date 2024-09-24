import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGlobalContext } from "@/contexts/global-context";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ChartLine } from "phosphor-react";
import { useState } from "react";

export function ChartDialog() {
  const { chartTitle, setChartTitle, chartColor, setChartColor } =
    useGlobalContext();
  const [title, setTitle] = useState(chartTitle);
  const [color, setColor] = useState(chartColor);

  const [isOpen, setIsOpen] = useState(false);

  function handleSave() {
    setChartTitle(title);
    setIsOpen(false);
    setChartColor(color);
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-start gap-2 text-primary w-full px-2 border-none"
        >
          <ChartLine size={20} weight="bold" /> Gráfico
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-auto max-h-svh">
        <DialogHeader>
          <DialogTitle>Configurar Gráfico</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label>Título</Label>
          <Input
            placeholder="Título do gráfico"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 border-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label>Cor</Label>
          <Input
            type="color"
            placeholder="Cor do gráfico"
            className="focus-visible:ring-0 focus-visible:ring-offset-0 border-2"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <Button onClick={handleSave} className="w-fit ml-auto">
          Salvar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
