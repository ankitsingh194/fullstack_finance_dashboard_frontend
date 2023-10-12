import  {useMemo, useState} from "react";
import { useGetKpisQuery } from "../../states/api";
import DashboardBox from "../../component/DashboardBox";
import FlexBetween from "../../component/FlexBetween";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import  { DataPoint ,linear } from "regression";






const Prediction = () => {
    const {palette} = useTheme();
    const [isPredictions, setisPredictionn] = useState(false);
    const {data: kpiData} = useGetKpisQuery();

    const formateddata = useMemo(()=> {
        if(!kpiData) return [];
        const monthdata = kpiData[0].monthlyData;

        const fromatted: Array<DataPoint> = monthdata.map(
            ({ revenue}, i: number) => {
                return [i,revenue]
            }
        );
        const regressionLine = linear(fromatted);
        return monthdata.map(({month , revenue}, i: number) => {
            return {
                name: month,
                "Actual revenue": revenue,
                "Regresion Line": regressionLine.points[i][1],
                "Predicted Revneue": regressionLine.predict(i+12)[1]
            }
        })
    }, [kpiData])

    return <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
        <FlexBetween m="1rem 2.5rem" gap="1rem">
            <Box>
                <Typography variant="h3">
                    Revenue and Predictions
                </Typography>
                <Typography variant="h6">
                    charted revenue and predicated revenue basrd on a simple linear regression model
                </Typography>
            </Box>
            <Button 
            onClick={() => setisPredictionn(!isPredictions)}
             sx={{
                color: palette.grey[900],
                backgroundColor: palette.grey[700],
                boxShadow: "0.1rem 0.1rem 0.1rem 0.1remm rgba(0,0,0,.4)"
            }}
            >
                show Predicted Revenue forNext Year 

            </Button>
        </FlexBetween>
        <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={500}
          height={400}
          data={formateddata}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{fontSize:"10px"}}/>
           <Label value="Month" offset={-5} position="insideBottom" />
          <YAxis
           domain={[12000, 26000]}
           axisLine={{ strokeWidth:"0"}}
           style={{fontSize:"10px"}}
           tickFormatter={(v) => `$${v}`}
            />
            <Label value="Revneue in USD" angle={-90} offset={-5} position="insideLeft" />
            <YAxis
           
           tickLine={false}
           axisLine={false}
           style={{fontSize:"10px"}}
            />
          <Tooltip />
          <Legend verticalAlign="top"
           />
          
          <Line 
           type="monotone" 
           dataKey="Actual revenue" 
           stroke={palette.primary.main}
            strokeWidth={0}
             dot={{ strokeWidth:5}}/>
          <Line 
           type="monotone" 
           dataKey="Regresion Line" 
           stroke="#8884d8" 
             dot={false}/>  

             {isPredictions && (
          <Line 
          
           strokeDasharray="5 5"
           dataKey="Predicted Revneue" 
           stroke={palette.secondary[500]}
           dot ={false} />
             )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
}

export default Prediction;