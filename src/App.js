import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

export default function App() {
  // Brand colors from your guidelines
  const ARIA_COLORS = {
    black: '#262628',
    purple: '#9C54AD',
    red: '#EB2726',
    blue: '#3C76A9',
    green: '#6DC19C',
    orange: '#F69757',
    yellow: '#FFCF4F',
    lightGray: '#E9EDF3'
  };

  // Chart data and options - Requirement 2: Reactive
  const [chartType, setChartType] = useState('area');
  const [theme, setTheme] = useState('light');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const [chartData, setChartData] = useState({
    dataVolume: [31, 40, 28, 51, 42, 109, 100, 85, 72, 56, 95, 120],
    insightsGenerated: [11, 32, 45, 32, 34, 52, 41, 55, 47, 62, 71, 83]
  });

  // ECharts options generator function
  const getEChartsOption = () => {
    const isDarkMode = theme === 'dark';
    
    return {
      backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
      // Requirement 5: Beautiful design
      animation: true,
      animationDuration: 800,
      animationEasing: 'cubicOut',
      
      // Requirement 4: Strong theming support
      color: [ARIA_COLORS.purple, ARIA_COLORS.blue],
      
      // Titles
      title: {
        text: 'ARIA Analytics Dashboard',
        subtext: 'Data Volume and Insights Generated',
        left: 'center',
        textStyle: {
          fontSize: 24,
          fontWeight: 600,
          color: isDarkMode ? '#F1F5F9' : ARIA_COLORS.black
        },
        subtextStyle: {
          fontSize: 16,
          color: isDarkMode ? '#CBD5E1' : ARIA_COLORS.black
        }
      },
      
      // Requirement 3: Interactive (tooltips)
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: ARIA_COLORS.purple
          }
        },
        formatter: function(params) {
          let result = params[0].axisValueLabel + '<br/>';
          params.forEach(param => {
            result += `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${param.color};"></span> `;
            result += `${param.seriesName}: ${param.value}<br/>`;
          });
          return result;
        }
      },
      
      // Tools and export
      toolbox: {
        feature: {
          // Requirement 7: Export to SVG support
          saveAsImage: { type: 'svg', title: 'Save as SVG' },
          dataZoom: { title: { zoom: 'Zoom', back: 'Reset Zoom' } },
          restore: { title: 'Reset' },
        },
        right: 20,
        iconStyle: {
          borderColor: isDarkMode ? '#CBD5E1' : ARIA_COLORS.black
        },
        emphasis: {
          iconStyle: {
            borderColor: ARIA_COLORS.purple
          }
        }
      },
      
      // Legend
      legend: {
        data: ['Data Volume', 'Insights Generated'],
        top: 60,
        textStyle: {
          color: isDarkMode ? '#F1F5F9' : ARIA_COLORS.black,
          fontSize: 14,
          fontWeight: 500
        }
      },
      
      // Grid
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: 100,
        containLabel: true
      },
      
      // X Axis
      xAxis: {
        type: 'category',
        boundaryGap: chartType !== 'line',
        data: months,
        axisLine: {
          lineStyle: {
            color: isDarkMode ? '#334155' : ARIA_COLORS.lightGray
          }
        },
        axisLabel: {
          color: isDarkMode ? '#CBD5E1' : ARIA_COLORS.black
        },
        // Requirement 1: Strong annotation capabilities - X axis region
        axisPointer: {
          label: {
            formatter: function (params) {
              return months[params.value];
            }
          }
        },
        splitLine: {
          show: false
        }
      },
      
      // Y Axis
      yAxis: {
        type: 'value',
        name: 'Volume',
        nameTextStyle: {
          color: isDarkMode ? '#F1F5F9' : ARIA_COLORS.black,
          fontWeight: 500
        },
        axisLabel: {
          color: isDarkMode ? '#CBD5E1' : ARIA_COLORS.black,
          formatter: '{value}'
        },
        axisLine: {
          lineStyle: {
            color: isDarkMode ? '#334155' : ARIA_COLORS.lightGray
          }
        },
        splitLine: {
          lineStyle: {
            color: isDarkMode ? '#334155' : ARIA_COLORS.lightGray,
            opacity: 0.3
          }
        }
      },
      
      // Requirement 1: Strong annotation capabilities - Markpoints, areas, etc.
      visualMap: {
        show: false,
        seriesIndex: 0,
        pieces: [{
          gt: 0,
          lte: 120,
          color: ARIA_COLORS.purple
        }]
      },
      
      // Series data
      series: [
        {
          name: 'Data Volume',
          // For area chart type, we still use 'line' type in ECharts but add areaStyle
          type: chartType === 'area' ? 'line' : chartType,
          smooth: true,
          data: chartData.dataVolume,
          // Area chart styling - only apply for area chart type, not for line
          areaStyle: chartType === 'area' ? {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: ARIA_COLORS.purple + 'AA' // Start with 67% opacity
              }, {
                offset: 1, color: ARIA_COLORS.purple + '11' // End with 7% opacity
              }]
            }
          } : undefined,
          // Requirement 1: Strong annotation capabilities - Mark points
          markPoint: {
            data: [
              {
                name: 'Data Spike',
                coord: [1, 45], // February (index 1) with value 45
                value: 'Data Spike',
                symbol: 'pin',
                symbolSize: 40,
                itemStyle: {
                  color: ARIA_COLORS.red
                },
                label: {
                  formatter: '{b}',
                  color: '#fff'
                }
              }
            ]
          },
          // Requirement 1: Strong annotation capabilities - Mark areas
          markArea: {
            silent: true,
            itemStyle: {
              color: ARIA_COLORS.green,
              opacity: 0.2
            },
            data: [
              [
                {
                  name: 'Target Zone',
                  yAxis: 100
                },
                {
                  yAxis: 120
                }
              ]
            ],
            label: {
              show: true,
              position: 'insideTop',
              color: ARIA_COLORS.black,
              fontSize: 12
            }
          }
        },
        {
          name: 'Insights Generated',
          // For area chart type, we still use 'line' type in ECharts but add areaStyle
          type: chartType === 'area' ? 'line' : chartType,
          smooth: true,
          data: chartData.insightsGenerated,
          // Area chart styling - only apply for area chart type, not for line
          areaStyle: chartType === 'area' ? {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: ARIA_COLORS.blue + 'AA' // Start with 67% opacity
              }, {
                offset: 1, color: ARIA_COLORS.blue + '11' // End with 7% opacity
              }]
            }
          } : undefined
        }
      ],
      
      // Requirement 1: Strong annotation capabilities - Mark areas for X axis
      graphic: [{
        type: 'rect',
        z: -100,
        left: '67%',  // Approximating Sep position
        right: '16%', // Approximating Nov position
        top: 100,
        bottom: '22%',
        style: {
          fill: ARIA_COLORS.yellow,
          opacity: 0.2
        }
      }, {
        type: 'text',
        left: '75%', // Center between Sep and Nov
        top: '95%',
        style: {
          text: 'Q4 Campaign',
          fill: isDarkMode ? '#CBD5E1' : ARIA_COLORS.black,
          fontSize: 12,
          backgroundColor: ARIA_COLORS.yellow,
          padding: 5
        }
      }]
    };
  };

  // Theme switching to demonstrate reactivity and theming support
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    // ECharts will automatically update with the new theme when getEChartsOption is called
  };

  // Add random data to demonstrate reactivity
  const addRandomData = () => {
    setChartData(prevState => {
      const newDataVolume = [...prevState.dataVolume];
      const newInsightsGenerated = [...prevState.insightsGenerated];
      
      // Update with random fluctuations
      const lastIdx = newDataVolume.length - 1;
      const newValue1 = Math.max(10, Math.min(150, newDataVolume[lastIdx] + Math.floor(Math.random() * 40) - 20));
      const newValue2 = Math.max(5, Math.min(100, newInsightsGenerated[lastIdx] + Math.floor(Math.random() * 30) - 15));
      
      newDataVolume[lastIdx] = newValue1;
      newInsightsGenerated[lastIdx] = newValue2;

      return {
        dataVolume: newDataVolume,
        insightsGenerated: newInsightsGenerated
      };
    });
  };

  // Change chart type to demonstrate flexibility
  const handleChartTypeChange = (value) => {
    setChartType(value);
    // ECharts will automatically update with the new chart type when getEChartsOption is called
  };
  
  // We no longer need this helper function since we've simplified the logic
  // Line charts will have no area style, area charts will have area style

  // Container styles
  const containerStyle = {
    padding: '24px',
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    color: theme === 'light' ? ARIA_COLORS.black : '#f1f5f9'
  };

  const buttonStyle = (color) => ({
    backgroundColor: color,
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 8px',
    transition: 'all 0.2s ease'
  });

  const chartContainerStyle = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#1E293B',
    borderRadius: '8px',
    padding: '20px',
    border: `1px solid ${theme === 'light' ? ARIA_COLORS.lightGray : '#334155'}`,
    transition: 'all 0.3s ease'
  };

  const controlsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '12px',
    backgroundColor: theme === 'light' ? ARIA_COLORS.lightGray : '#1E293B',
    borderRadius: '8px'
  };

  const selectStyle = {
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: theme === 'light' ? '#FFFFFF' : '#334155',
    color: theme === 'light' ? ARIA_COLORS.black : '#F1F5F9',
    border: `1px solid ${theme === 'light' ? ARIA_COLORS.lightGray : '#475569'}`,
    fontSize: '14px',
    cursor: 'pointer'
  };

  const switchContainer = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  };

  const labelStyle = {
    fontSize: '14px',
    marginRight: '8px'
  };

  const featureListStyle = {
    marginTop: '20px',
    padding: '16px',
    backgroundColor: theme === 'light' ? ARIA_COLORS.lightGray : '#1E293B',
    borderRadius: '8px'
  };

  const featureHeaderStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '12px',
    color: theme === 'light' ? ARIA_COLORS.black : '#F1F5F9'
  };

  const featureItemStyle = {
    fontSize: '14px',
    margin: '8px 0',
    color: theme === 'light' ? ARIA_COLORS.black : '#CBD5E1'
  };

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontWeight: 'bold',
          fontSize: '32px',
          margin: '0 0 8px 0',
          color: theme === 'light' ? ARIA_COLORS.black : '#F1F5F9'
        }}>
          ARIA Analytics Visualization
        </h1>
        <p style={{
          fontSize: '16px',
          margin: 0,
          color: theme === 'light' ? ARIA_COLORS.black : '#CBD5E1'
        }}>
          Exploring data insights with interactive charts
        </p>
      </div>
      
      <div style={controlsContainerStyle}>
        <div style={switchContainer}>
          <span style={labelStyle}>Theme:</span>
          <div style={{ 
            display: 'inline-block', 
            position: 'relative',
            width: '48px',
            height: '24px',
            backgroundColor: theme === 'light' ? '#E2E8F0' : '#475569',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }} onClick={toggleTheme}>
            <div style={{
              position: 'absolute',
              left: theme === 'light' ? '4px' : '24px',
              top: '4px',
              width: '16px',
              height: '16px',
              backgroundColor: theme === 'light' ? ARIA_COLORS.purple : '#F1F5F9',
              borderRadius: '50%',
              transition: 'left 0.3s'
            }}></div>
          </div>
          <span style={{ fontSize: '14px' }}>
            {theme === 'light' ? 'Light' : 'Dark'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={labelStyle}>Chart Type:</span>
          <select 
            value={chartType} 
            onChange={(e) => handleChartTypeChange(e.target.value)}
            style={selectStyle}
          >
            <option value="line">Line</option>
            <option value="area">Area</option>
            <option value="bar">Bar</option>
          </select>
        </div>

        <div>
          <button 
            style={{...buttonStyle(ARIA_COLORS.blue), marginRight: '8px'}} 
            onClick={addRandomData}
          >
            Update Data
          </button>
          <button 
            style={buttonStyle(ARIA_COLORS.purple)} 
          >
            Export SVG
          </button>
        </div>
      </div>
      
      <div style={chartContainerStyle}>
        <ReactECharts 
          option={getEChartsOption()} 
          style={{ height: '450px' }}
          opts={{ renderer: 'svg' }} // Use SVG renderer for better quality
        />
      </div>
      
      <div style={featureListStyle}>
        <h3 style={featureHeaderStyle}>ECharts Features in ARIA:</h3>
        <ul style={{ paddingLeft: '20px' }}>
          <li style={featureItemStyle}><strong>Annotations:</strong> Mark points, mark areas, and region highlights</li>
          <li style={featureItemStyle}><strong>Reactivity:</strong> Dynamic data updates and theme switching</li>
          <li style={featureItemStyle}><strong>Interactivity:</strong> Rich tooltips, zooming, and chart type switching</li>
          <li style={featureItemStyle}><strong>Theming:</strong> Full light/dark theme with ARIA brand colors</li>
          <li style={featureItemStyle}><strong>Aesthetics:</strong> Gradient fills, smooth animations, and brand typography</li>
          <li style={featureItemStyle}><strong>Template-based:</strong> Structured for easy LLM generation</li>
          <li style={featureItemStyle}><strong>SVG Export:</strong> Built-in export functionality</li>
        </ul>

        <p style={{ 
          fontSize: '14px', 
          fontStyle: 'italic',
          marginTop: '16px',
          color: theme === 'light' ? ARIA_COLORS.black : '#CBD5E1'
        }}>
          This component can be integrated into the ARIA Output Panel for AI-generated visualizations.
        </p>
      </div>
    </div>
  );
}