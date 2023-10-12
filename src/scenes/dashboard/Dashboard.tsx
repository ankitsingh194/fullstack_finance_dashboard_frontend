import {Box ,useMediaQuery, useTheme} from "@mui/material";
import DashboardBox from "../../component/DashboardBox";
import {useGetKpisQuery } from "../../states/api"
import  {  useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend, LineChart, BarChart, Bar } from  'recharts';
import BoxHeader from "../../component/BoxHeader";
import Row2 from "./Row2";
import Row3 from "./Row3";



const gridTemplateBigScreen = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;

const gridTemplateSmallScreen = `
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
  `;


const Dashboard = () => {
  const isAboveMediumScreen = useMediaQuery("(min-width:1200px)")
  const {data } = useGetKpisQuery();
  
  const { palette } = useTheme();



  const revenuExpeese = useMemo(()=> {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue , expenses }) => {
    
        return {
          name: month.substring(0,3),
          revenue: revenue,
          expenses :expenses
          
        }
        
      })
    
    );
    
  }, [data]);

  const revenuProfit = useMemo(()=> {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue , expenses }) => {
    
        return {
          name: month.substring(0,3),
          revenue: revenue,
          profit : revenue -  expenses,
          
        }
        
      })
    
    );
    
  }, [data]);
  console.log(revenuExpeese);
  return (
    <Box width="100%" display="grid" gap="1.5rem"
    sx={
      isAboveMediumScreen ? {
      gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
      gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
      gridTemplateAreas:gridTemplateBigScreen
    } : {
      gridAutoColumns:"1fr",
      gridAutoRows: "80px",
      gridTemplateAreas: gridTemplateSmallScreen
    }

    }>

      <DashboardBox  gridArea="a">
        <BoxHeader 
           title="Revenue and Expense"
           subtitle="top line represent revenue, bottom line represent expense"
           sideText="+4%"
           />
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          width={500}
          height={400}
          data={revenuExpeese}
          margin={{
            top: 15,
            right: 25,
            left: -5,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
             <stop offset="5%"
             stopColor={palette.primary[300]}
             stopOpacity={0.5}
             />
             <stop offset="95%"
             stopColor={palette.primary[300]}
             stopOpacity={0}
             />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
             <stop offset="5%"
             stopColor={palette.primary[300]}
             stopOpacity={0.5}
             />
             <stop offset="95%"
             stopColor={palette.primary[300]}
             stopOpacity={0}
             />
              </linearGradient>

          </defs>
          <XAxis dataKey="name" tickLine={false} style={{fontSize:"10px"}}/>
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="revenue" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" />
          <Area type="monotone" dataKey="expenses" stroke={palette.primary.main} fillOpacity={1} fill="url(#colorExpense)" />
        </AreaChart>
      </ResponsiveContainer>


      </DashboardBox>
      <DashboardBox  gridArea="b">
      <BoxHeader 
           title="Revenue and expenses Month by Month "
           subtitle="top line represent revenue, bottom line represent expense"
           sideText="+4%"
           />
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          width={500}
          height={400}
          data={revenuExpeese}
          margin={{
            top: 15,
            right: 25,
            left: -5,
            bottom: 0,
          }}
        >
          
          <XAxis dataKey="name" tickLine={false} style={{fontSize:"10px"}}/>
          <YAxis
           yAxisId="left"
           tickLine={false}
           axisLine={false}
           style={{fontSize:"10px"}}
            />
            <YAxis
           yAxisId="right"
           orientation="right"
           tickLine={false}
           axisLine={false}
           style={{fontSize:"10px"}}
            />
          <Tooltip />
          <Legend height={20} wrapperStyle={{
            margin: '0 0 10px 0'
          }} />
          
          <Bar yAxisId="left" dataKey="revenue" stroke={palette.tertiary[500]} fill="#8884d8"/>
          <Bar yAxisId="right"  dataKey="expenses" stroke={palette.primary.main} fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox  gridArea="c">
      <BoxHeader 
           title="Revenue and Profit"
           subtitle="top line represent revenue, bottom line represent expense"
           sideText="+4%"
           />
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          width={500}
          height={400}
          data={revenuProfit}
          margin={{
            top: 15,
            right: 25,
            left: -5,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{fontSize:"10px"}}/>
          <YAxis
           yAxisId="left"
           tickLine={false}
           axisLine={false}
           style={{fontSize:"10px"}}
            />
            <YAxis
           yAxisId="right"
           orientation="right"
           tickLine={false}
           axisLine={false}
           style={{fontSize:"10px"}}
            />
          <Tooltip />
          <Legend height={20} wrapperStyle={{
            margin: '0 0 10px 0'
          }} />
          
          <Line yAxisId="left" type="monotone" dataKey="revenue" stroke={palette.tertiary[500]} />
          <Line yAxisId="right" type="monotone" dataKey="profit" stroke={palette.primary.main} />
        </LineChart>
      </ResponsiveContainer>

      </DashboardBox>
      <Row2/>
      
      <Row3 />


      

    
    </Box>
  );
}

export default Dashboard