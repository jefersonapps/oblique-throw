import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChartLine } from "phosphor-react";
import { useState } from "react";
import { ChartCardComponent, ChartDataProps } from "./chart-card";
import { useGlobalContext } from "@/contexts/global-context";

interface ChartWrapperProps {
  chart: ChartDataProps;
  maxHeightPoint?: [number, number];
}

export const ChartWrapper = ({ chart, maxHeightPoint }: ChartWrapperProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { chartTitle } = useGlobalContext();

  const toggleHeight = () => {
    setIsExpanded(!isExpanded);
  };

  const containerVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute top-20 right-0 z-50 w-fit"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="fixed z-20 flex gap-2 pl-3 pt-3">
              <button
                className="minus z-10 size-4 rounded-full bg-yellow-600"
                onClick={toggleHeight}
              />
              <span className="z-10 size-4 cursor-default rounded-full bg-zinc-500 dark:bg-zinc-800" />
              <span className="z-10 size-4 cursor-default rounded-full bg-zinc-500 dark:bg-zinc-800" />
            </div>
            <div className="flex max-h-[calc(50vh_-_114px)] min-h-[252px] flex-col gap-2 overflow-y-auto pr-2 md:max-h-[calc(100vh_-_114px)]">
              <ChartCardComponent
                data={{
                  data1: chart.data1,
                  data2: chart.data2,
                }}
                graficoConfig={{
                  eixos: ["x", "y"],
                  titulo: chartTitle,
                }}
                maxHeightPoint={maxHeightPoint}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isExpanded && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute top-20 right-2 z-[5]"
        >
          <Button
            onClick={toggleHeight}
            size="icon"
            className="bg-zinc-200 text-black hover:bg-muted dark:bg-card dark:text-white"
          >
            <ChartLine size={20} weight="bold" />
          </Button>
        </motion.div>
      )}
    </>
  );
};
