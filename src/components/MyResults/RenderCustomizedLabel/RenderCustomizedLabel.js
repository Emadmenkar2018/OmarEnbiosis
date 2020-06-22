import React, {Fragment} from 'react'

const RenderCustomizedLabel = ({
    cx, 
    cy, 
    midAngle, 
    outerRadius, 
    fill, 
    payload, 
    value
}) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius) * cos;
    const sy = cy + (outerRadius) * sin;
    const mx = cx + (outerRadius) * cos;
    const my = cy + (outerRadius) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 30;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
   
    return (
        <g>
            {payload.title.length > 1 ? 
                <Fragment>
                    <text x={cx} y={cy} dy={-5} textAnchor="middle" fill={'#565d68'} style={{fontWeight: "bold", fontSize: '1.3rem'}}>
                        {payload.title[0]}
                    </text>
                    <text x={cx} y={cy} dy={20} textAnchor="middle" fill={'#565d68'} style={{fontWeight: "bold", fontSize: '1.3rem'}}>
                        {payload.title[1]}
                    </text>
                </Fragment>
                : 
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={'#565d68'} style={{fontWeight: "bold", fontSize: '1.3rem'}}>
                    {payload.title[0]}
                </text>
            }
            <circle 
                cx={sx} 
                cy={sy} 
                r={4} 
                fill={fill} 
                stroke="white"
            />
            <path 
                d={cos >= 0 ? 
                    `M${ex+25},${ey+5}L${mx+50},${my}L${mx+4},${my}` :
                    `M${ex-25},${ey-5}L${mx-50},${my}L${mx-4},${my}`
                }
                stroke='#95989e' 
                fill="none"
            />
            <text 
                x={sx + (cos >= 0 ? 40 : -48)} 
                y={sy + (cos >= 0 ? 18 : -8)}
                textAnchor={textAnchor} 
                fill={'#565d68'}
                style={{
                    fontWeight: "bold",
                    fontSize: '0.9rem'
                }}
            >
                {`%${value}`}
            </text>
        </g>
    )
}

export default RenderCustomizedLabel;