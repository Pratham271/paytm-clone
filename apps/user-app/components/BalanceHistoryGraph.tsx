"use client"
import React from 'react'
import { VictoryChart, VictoryLine, VictoryScatter, VictoryTooltip } from 'victory'

type DataProps = {
    x: string;
    y: number
}[]
const BalanceHistoryGraph = ({data}: {data:DataProps}) => {
    let max:number=0;
    for(let i=0; i<data.length; i++){
        if(data[i]?.y!>max){
            max = data[i]?.y!
        }
    }
    
  return (
    <VictoryChart
   
   >
     <VictoryLine
     interpolation="natural"
     domain={{y: [0, max+100]}}
     animate={{
       duration: 2000,
       onLoad: { duration: 4000 }
     }}
       style={{
         data: { stroke: "#c43a31" },
   
         // parent: { border: "1px solid #ccc"}
         
       }}
      
      data={data}
     />
    
      <VictoryScatter data={data}
              
               size={({ active }) => active ? 5 : 3}
               labels={({ datum }) => ("Rs "+datum.y+" on "+datum.x.split(",")[0]+" at "+datum.x.split(",")[1])}
               labelComponent={<VictoryTooltip/>}
               style={{ data: { fill: "#c43a31",opacity: ({ datum }) => datum.opacity || 1  },  }}
               animate={{
                animationWhitelist: ["style", "data", "size"], // Try removing "size"
                onLoad: {
                  duration: 1500,
                  before: () => ({ opacity: 0.3, _y: 0 }),
                  after: (datum) => ({ opacity: 1, _y: datum._y })
                }
              }}
             />
   </VictoryChart>
  )
}

export default BalanceHistoryGraph
