import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useGetKpisQuery, useGetProductsQuery } from "../../../state/api";
import DashboardBox from "../../component/DashboardBox";
import { useGetTransactionsQuery } from "../../states/api";
import  { useMemo } from 'react';
import BoxHeader from "../../component/BoxHeader";
import { Box , Typography, useTheme} from "@mui/material";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import FlexBetween from "../../component/FlexBetween";





const Row3 = () => {
    const { palette } = useTheme();
    const pieColors = [palette.primary[800], palette.primary[300]];
    const { data: kpisData} = useGetKpisQuery();
    const {data : productData } = useGetProductsQuery();
    const {data: transactionData } = useGetTransactionsQuery();
    console.log("kpi data" ,kpisData);
    const pieChartData = useMemo(() => {
        if(kpisData){
            const totalExpenses = kpisData[0].totalExpenses;
            console.log("totalexpenses",totalExpenses)
            console.log("totalexpensesbycaategory",kpisData[0].expensesByCategory)

            return Object.entries(kpisData[0].expensesByCategory).map(
                ([key, value]) => {
                    return [
                        {
                            name : key,
                            value : value,
                        },
                        {
                            name : `${key} of Total`,
                            value : totalExpenses - value,
                        },

                    ]
                }
            )
        }
    }, [kpisData])

    const productColorms =[
        {
            field:"_id",
            headername:"id",
            flex:1,
        },
        {
            field:"expense",
            headername:"Expense",
            flex:0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field:"price",
            headername:"Price",
            flex:0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
    ]

    const transactionColums =[
        {
            field:"_id",
            headername:"id",
            flex:1,
        },
        {
            field:"buyer",
            headername:"Buyer",
            flex:0.67,
    
        },
        {
            field:"amount",
            headername:"Amount",
            flex:0.35,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field:"productIds",
            headername:"Count",
            flex:0.1,
            renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
        },
    ] 
    console.log('transacion', transactionData);

    return (
        <>
        <DashboardBox  gridArea="g" >
            <BoxHeader
               title="List of Products"
               sideText={`${productData?.length} products` }
             />
             <ResponsiveContainer  height="80%" >
             <Box  
             mt="0.5rem"
             p="0 0.5rem"
            
             
             sx={{
                "& .MuiDataGrid-root": {
                    color: palette.grey[300],
                    border:"none"
                }, "& .MuiDataGrid-cell": {
                    borderBottom: `1px solid ${palette.grey[800]} !important`
                }, "& .MuiDataGrid-columnHeaders": {
                    borderBottom: `1px solid ${palette.grey[800]} !important`,
                }, "& .MuiDataGrid-columnSeparator": {
                    visibility:"hidden",
                },

             }}
             >

            <DataGrid 
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            columns={productColorms} rows={productData || []} />
            </Box>
            </ResponsiveContainer >
        </DashboardBox>
        <DashboardBox  gridArea="h"  >
        <BoxHeader
               title="Recent Orders"
               sideText={`${transactionData?.length} products` }
             />
             <ResponsiveContainer height="80%"  >
             <Box  
             mt="1rem"
             p="0 0.5rem"
             
             sx={{
                "& .MuiDataGrid-root": {
                    color: palette.grey[300],
                    border:"none"
                }, "& .MuiDataGrid-cell": {
                    borderBottom: `1px solid ${palette.grey[800]} !important`
                }, "& .MuiDataGrid-columnHeaders": {
                    borderBottom: `1px solid ${palette.grey[800]} !important`,
                }, "& .MuiDataGrid-columnSeparator": {
                    visibility:"hidden",
                },

             }}
             >

            <DataGrid 
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            columns={transactionColums} rows={transactionData || []} />
            </Box>
            </ResponsiveContainer>
        </DashboardBox>
        <DashboardBox  gridArea="i">
           
            <BoxHeader title="Expense Breakdown By Category" sideText="+6%" />
            <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
           {pieChartData?.map((data,i) => (
                 <Box key={`${data[0].name}-${i}`}>
                 <PieChart
             
             width={110}
              height={100}
         >
            <Pie
            stroke="none"
              data={data}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} 
                fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Typography variant="h5">{data[0].name}</Typography>
          </Box>
        

           ))}
          </FlexBetween>
       
     
        </DashboardBox>
        <DashboardBox  gridArea="j">
            <BoxHeader title="Overall Summary and Explanation Data" sideText="+4%" />
            <Box
            height="15px"
            margin="1.25rem 1rem 0.4rem 1rem"
            bgcolor={palette.primary[800]}
            borderRadius="1rem"
        >
                <Box
                 height="15px"
                 bgcolor={palette.primary[600]}
                 borderRadius="1rem"
                 width="40%">

                </Box>
                <Typography margin="0 1rem" variant="h6">
                We don't say cosa vuol dire quello? implying something the other person said. We just say Cosa vuole dire?
                </Typography>
            </Box>
        </DashboardBox>
        </>
    )
};

export default Row3;