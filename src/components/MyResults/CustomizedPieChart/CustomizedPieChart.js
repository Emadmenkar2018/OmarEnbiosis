import React, { Component } from 'react'
import {ResponsiveContainer, PieChart, Pie, Cell, Legend} from 'recharts'
import RenderCustomizedLabel from '../RenderCustomizedLabel/RenderCustomizedLabel'

class CustomizedPieChart extends Component {
    render() {
        // const COLORS = ['#fe7a6e', '#4f4fa1', '#59c4d9'];
        // const COLORS = ['#fe7a6e', '#aa6586', '#4f4fa1', '#59c4d9'];
        // const COLORS = ['#4f4fa1', '#59c4d9', '#fe7a6e', '#e67475', '#E8AEB0', '#DDCCFF', '#FFE7BF'];
        // const COLORS = ['#2699d6', '#59c4d9', '#a6deeb', '#ffe8bf', '#edd1a1', '#f59178', '#e3614d']; //without purple
        // const COLORS = ['#4f4fa1', '#2699d6', '#59c4d9', '#ffe8bf', '#edd1a1', '#f59178', '#e3614d']; // with purple
        // const COLORS = ['#ffe8bf', '#2699d6', '#59c4d9', '#4f4fa1', '#edd1a1', '#f59178', '#e3614d']; // switch purple and yellow
        const {data, cx, cy, myInnerRadius, myOuterRadius, myChartWidth, myChartHegiht} = this.props;
        const COLORS = data.length > 6 ? 
            ['#edd1a1', '#2699d6', '#59c4d9', '#4f4fa1', '#f59178', '#ffe8bf', '#e3614d'] : 
            ['#4f4fa1', '#59c4d9', '#fe7a6e', '#e67475', '#E8AEB0', '#DDCCFF', '#FFE7BF'];
        return (
            <ResponsiveContainer width={`${myChartWidth}%`} height={myChartHegiht}>
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={data}
                        cx={cx}
                        cy={cy}
                        innerRadius={myInnerRadius}
                        outerRadius={myOuterRadius}
                        fill='#8884d8'
                        legendType='circle'
                        labelLine={false}
                        label={RenderCustomizedLabel}
                    >
                        {
                            data.map((d, index) => 
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]} 
                                />
                            )
                        }
                    </Pie>
                    <Legend iconSize={10}/>
                </PieChart>
            </ResponsiveContainer>
        )
    }
}

export default CustomizedPieChart;