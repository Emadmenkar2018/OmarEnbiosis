import React from 'react'
import './ChartsWrapper.css'
import {ResponsiveContainer, PieChart, Pie, Cell, Legend} from 'recharts'
import CustomizedPieChart from '../CustomizedPieChart/CustomizedPieChart'
import RenderCustomizedLabel from '../RenderCustomizedLabel/RenderCustomizedLabel'
import withWindowDimensions from '../../../hoc/withWindowDimensions'

// const COLORS = ['#4f4fa1', '#59c4d9', '#fe7a6e', '#e67475', '#E8AEB0', '#DDCCFF', '#FFE7BF'];
// const COLORS = ['#ffe8bf', '#2699d6', '#59c4d9', '#4f4fa1', '#f59178', '#edd1a1', '#e3614d'];

const ChartsWrapper = ({windowWidth, chartItems}) => {
    const myItem = chartItems.find(item => item.isMy);
    const myData = myItem.scores.map(score => ({
        ...score,
        value: +score.value.toFixed(1), 
        title: myItem.head.split(' ')
    }));
    const otherItems = chartItems.filter(item => !item.isMy);
    const otherData = otherItems.map(item => {
        return item.scores.map(score => ({
            ...score,
            value: +score.value.toFixed(1), 
            title: item.head.split(' ')
        }))
    });
    const COLORS = otherData[0].length > 6 ? 
        ['#edd1a1', '#2699d6', '#59c4d9', '#4f4fa1', '#f59178', '#ffe8bf', '#e3614d'] : 
        ['#4f4fa1', '#59c4d9', '#fe7a6e', '#e67475', '#E8AEB0', '#DDCCFF', '#FFE7BF'];

    let myChartWidth = 34.5;
    let myChartHegiht = 400;
    let otherChartsWidth = 64.5;
    let otherChartsHeight = 400;

    if(windowWidth < 1700){
        myChartWidth = 100;
        otherChartsWidth = 100;
    }
    if(windowWidth < 850){
        otherChartsHeight = 700
    }
    
    return (
        <div className='charts-wrapper'>
            <CustomizedPieChart
                data={myData}
                cx='50%'
                cy='50%'
                myInnerRadius={windowWidth <= 414 ? 60 : 80}
                myOuterRadius={windowWidth <= 414 ? 75 : 100}
                myChartWidth={myChartWidth}
                myChartHegiht={myChartHegiht}
            />
            <ResponsiveContainer width={`${otherChartsWidth}%`} height={otherChartsHeight}>
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={otherData[0]}
                        cx={windowWidth < 850 ? '50%' : '25%'}
                        cy={windowWidth < 850 ? '25%' : '50%'}
                        innerRadius={windowWidth <= 414 ? 60 : 80}
                        outerRadius={windowWidth <= 414 ? 75 : 100}
                        fill='#8884d8'
                        legendType='circle'
                        labelLine={false}
                        label={RenderCustomizedLabel}
                    >
                        {
                            otherData[0].map((d, index) => 
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]} 
                                />
                            )
                        }
                    </Pie>
                    <Legend iconSize={10}/>
                    <Pie
                        dataKey="value"
                        data={otherData[1]}
                        cx={windowWidth < 850 ? '50%' : '75%'}
                        cy={windowWidth < 850 ? '75%' : '50%'}
                        innerRadius={windowWidth <= 414 ? 60 : 80}
                        outerRadius={windowWidth <= 414 ? 75 : 100}
                        fill='#8884d8'
                        legendType="none"
                        labelLine={false}
                        label={RenderCustomizedLabel}
                    >
                        {
                            otherData[1].map((d, index) => 
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]} 
                                />
                            )
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default withWindowDimensions(ChartsWrapper);