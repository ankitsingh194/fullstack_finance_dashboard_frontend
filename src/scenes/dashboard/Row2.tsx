import DashboardBox from "../../component/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery } from "../../states/api";
import { useMemo } from 'react';
import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend, LineChart, Pie,Cell, PieChart, ScatterChart, Scatter} from  'recharts';
import {useTheme , Box, Typography} from "@mui/material";
import BoxHeader from "../../component/BoxHeader";


const pieData =[
    {name: "Group A", value: 600},
    { name: "Group A", value:400},
]


const Row2 = () => {
    const {palette} = useTheme();
    const pieColors = [palette.primary[800], palette.primary[300]];
    const { data: operationalData  } = useGetKpisQuery();
    const {data : productData} = useGetProductsQuery();
    
    const operationalExpenses = useMemo(() => {
        return (
            operationalData &&
            operationalData[0].monthlyData.map(
                ({ month, operationalExpenses, nonOperationalExpenses}) =>{
                    return {
                        name: month.substring(0,3),
                        "operational Expenses": operationalExpenses,
                        "Non Operational Expenses": nonOperationalExpenses,
                    };
                }
            )
        )
    },[operationalData])

    const ProductExpenseData = useMemo(() => {
        return (
            productData &&
            productData.map( ({ _id, price , expense}) =>{
                    return {
                        id: _id,
                        price: price,
                        expense: expense,
                    };
                }
            )
        )
    },[productData])
    

    return (
        
        
    <><DashboardBox gridArea="d">
            <BoxHeader
                title="Operational vs Non Operational Expenses"
                subtitle="top line represent revenue, bottom line represent expense"
                sideText="+4%" />
            <ResponsiveContainer width="100%" height="80%">
                <LineChart
                    width={500}
                    height={400}
                    data={operationalExpenses}
                    margin={{
                        top: 15,
                        right: 25,
                        left: -5,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                    <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
                    <YAxis
                        yAxisId="left"
                        tickLine={false}
                        axisLine={false}
                        style={{ fontSize: "10px" }} />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        style={{ fontSize: "10px" }} />
                    <Tooltip />
                    <Legend height={20} wrapperStyle={{
                        margin: '0 0 10px 0'
                    }} />

                    <Line yAxisId="left" type="monotone" dataKey="operational Expenses" stroke={palette.tertiary[500]} />
                    <Line yAxisId="right" type="monotone" dataKey="Non Operational Expenses" stroke={palette.primary.main} />
                </LineChart>
            </ResponsiveContainer>
        </DashboardBox>
        
        <DashboardBox gridArea="e">
            <BoxHeader title="Campaings and Targets" sideText="4%" />

        
        <PieChart
        
         width={110}
          height={100}
          margin={{
            top:0,
            right:-10,
            left:10,
            bottom:0,
          }}>
        <Pie
        stroke="none"
          data={pieData}
          innerRadius={18}
          outerRadius={38}
          paddingAngle={2}
          dataKey="value"
        >
          {pieData.map((_entry, index) => (
            <Cell key={`cell-${index}`} 
            fill={pieColors[index]} />
          ))}
        </Pie>
      </PieChart>
      <Box ml="-0.7rem" marginTop="-6rem" flexBasis="40%" textAlign="center">
        <Typography variant="h5">Target Sales</Typography>
        <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
            83
        </Typography>
        <Typography variant="h6">
            Finance goal of the Campaings that is desired
        </Typography>
      </Box>
      <Box ml="70%" marginTop="-4rem" flexBasis="40%">
        <Typography variant="h5">Losses in Revenue</Typography>
        <Typography  variant="h6"> Losses are down 25%</Typography>
        <Typography mt="0.4rem" variant="h5">
            Profit Margins
        </Typography>
        <Typography variant="h6">
            Margins are up by 30% from last month.
        </Typography>
      </Box>

            </DashboardBox>

            <DashboardBox gridArea="f">
                <BoxHeader title="Product Price vs Expenses" sideText="+4%"></BoxHeader>
                <ResponsiveContainer width="100%" height="85%">
        <ScatterChart
          margin={{
            top: 20,
            right: 25,
            bottom: 20,
            left: -10,
          }}
        >
          <CartesianGrid stroke={palette.grey[800]} />
          <XAxis type="number" dataKey="price" name="price"  axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
          <YAxis  type="number" dataKey="expense" name="expense" axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`}   />
          <Tooltip formatter={(v) => `$${v}`} />
          <Scatter name="Product Expense ratio" data={ProductExpenseData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
     </DashboardBox></>
         



    )
}

export default Row2;