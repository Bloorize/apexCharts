import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

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
  const [chartData, setChartData] = useState({
    series: [{
      name: 'Data Volume',
      data: [31, 40, 28, 51, 42, 109, 100, 85, 72, 56, 95, 120]
    }, {
      name: 'Insights Generated',
      data: [11, 32, 45, 32, 34, 52, 41, 55, 47, 62, 71, 83]
    }],
    options: {
      chart: {
        height: 350,
        type: 'area',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        toolbar: {
          show: true,
          tools: {
            download: true, // Requirement 7: Export to SVG support
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
        // Requirement 5: Beautiful design
        background: '#FFFFFF',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      // Requirement 4: Strong theming support
      colors: [ARIA_COLORS.purple, ARIA_COLORS.blue],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.6,
          opacityTo: 0.1,
          stops: [0, 90, 100]
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      // Requirement 3: Interactive (tooltips)
      tooltip: {
        enabled: true,
        shared: true,
        y: {
          formatter: function (val) {
            return val.toFixed(0);
          }
        },
        marker: {
          show: true,
        }
      },
      // Requirement 1: Strong annotation capabilities
      annotations: {
        points: [{
          x: 'Feb',
          y: 45,
          marker: {
            size: 8,
            fillColor: ARIA_COLORS.red,
            strokeColor: '#fff',
            strokeWidth: 2,
            radius: 2
          },
          label: {
            borderColor: ARIA_COLORS.red,
            offsetY: 0,
            style: {
              background: ARIA_COLORS.red,
              color: '#fff',
              padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5,
              },
              fontSize: '12px'
            },
            text: 'Data Spike'
          }
        }],
        yaxis: [{
          y: 100,
          y2: 120,
          borderColor: ARIA_COLORS.green,
          fillColor: ARIA_COLORS.green,
          opacity: 0.2,
          label: {
            borderColor: ARIA_COLORS.green,
            style: {
              color: ARIA_COLORS.black,
              background: ARIA_COLORS.green,
              fontSize: '12px'
            },
            text: 'Target Zone'
          }
        }],
        xaxis: [{
          x: 'Sep',
          x2: 'Nov',
          fillColor: ARIA_COLORS.yellow,
          opacity: 0.2,
          label: {
            orientation: 'horizontal',
            style: {
              color: ARIA_COLORS.black,
              background: ARIA_COLORS.yellow,
              fontSize: '12px'
            },
            text: 'Q4 Campaign'
          }
        }]
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {
            colors: ARIA_COLORS.black
          }
        }
      },
      yaxis: {
        title: {
          text: 'Volume',
          style: {
            fontWeight: 500,
            color: ARIA_COLORS.black
          }
        },
        labels: {
          style: {
            colors: ARIA_COLORS.black
          }
        }
      },
      legend: {
        position: 'top',
        fontWeight: 500,
        fontSize: '14px'
      },
      title: {
        text: 'ARIA Analytics Dashboard',
        align: 'center',
        style: {
          fontSize: '24px',
          fontWeight: 600,
          color: ARIA_COLORS.black
        }
      },
      subtitle: {
        text: 'Data Volume and Insights Generated',
        align: 'center',
        style: {
          fontSize: '16px',
          color: ARIA_COLORS.black
        }
      },
      grid: {
        borderColor: ARIA_COLORS.lightGray,
        row: {
          colors: ['transparent', 'transparent'],
          opacity: 0.2
        },
      },
    },
  });

  // Theme switching to demonstrate reactivity and theming support
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      setChartData(prevState => ({
        ...prevState,
        options: {
          ...prevState.options,
          chart: {
            ...prevState.options.chart,
            background: '#1E293B',
          },
          grid: {
            ...prevState.options.grid,
            borderColor: '#334155',
          },
          title: {
            ...prevState.options.title,
            style: {
              ...prevState.options.title.style,
              color: '#F1F5F9'
            }
          },
          subtitle: {
            ...prevState.options.subtitle,
            style: {
              ...prevState.options.subtitle.style,
              color: '#CBD5E1'
            }
          },
          xaxis: {
            ...prevState.options.xaxis,
            labels: {
              style: {
                colors: '#CBD5E1'
              }
            }
          },
          yaxis: {
            ...prevState.options.yaxis,
            title: {
              ...prevState.options.yaxis.title,
              style: {
                ...prevState.options.yaxis.title.style,
                color: '#F1F5F9'
              }
            },
            labels: {
              style: {
                colors: '#CBD5E1'
              }
            }
          },
          legend: {
            ...prevState.options.legend,
            labels: {
              colors: '#F1F5F9'
            }
          }
        }
      }));
    } else {
      setTheme('light');
      setChartData(prevState => ({
        ...prevState,
        options: {
          ...prevState.options,
          chart: {
            ...prevState.options.chart,
            background: '#FFFFFF',
          },
          grid: {
            ...prevState.options.grid,
            borderColor: ARIA_COLORS.lightGray,
          },
          title: {
            ...prevState.options.title,
            style: {
              ...prevState.options.title.style,
              color: ARIA_COLORS.black
            }
          },
          subtitle: {
            ...prevState.options.subtitle,
            style: {
              ...prevState.options.subtitle.style,
              color: ARIA_COLORS.black
            }
          },
          xaxis: {
            ...prevState.options.xaxis,
            labels: {
              style: {
                colors: ARIA_COLORS.black
              }
            }
          },
          yaxis: {
            ...prevState.options.yaxis,
            title: {
              ...prevState.options.yaxis.title,
              style: {
                ...prevState.options.yaxis.title.style,
                color: ARIA_COLORS.black
              }
            },
            labels: {
              style: {
                colors: ARIA_COLORS.black
              }
            }
          },
          legend: {
            ...prevState.options.legend,
            labels: {
              colors: ARIA_COLORS.black
            }
          }
        }
      }));
    }
  };

  // Add random data to demonstrate reactivity
  const addRandomData = () => {
    setChartData(prevState => {
      const newData1 = [...prevState.series[0].data];
      const newData2 = [...prevState.series[1].data];
      
      // Update with random fluctuations
      const lastIdx = newData1.length - 1;
      const newValue1 = Math.max(10, Math.min(150, newData1[lastIdx] + Math.floor(Math.random() * 40) - 20));
      const newValue2 = Math.max(5, Math.min(100, newData2[lastIdx] + Math.floor(Math.random() * 30) - 15));
      
      newData1[lastIdx] = newValue1;
      newData2[lastIdx] = newValue2;

      return {
        ...prevState,
        series: [
          { ...prevState.series[0], data: newData1 },
          { ...prevState.series[1], data: newData2 }
        ]
      };
    });
  };

  // Change chart type to demonstrate flexibility
  const [chartType, setChartType] = useState('area');
  const handleChartTypeChange = (value) => {
    setChartType(value);
    setChartData(prevState => ({
      ...prevState,
      options: {
        ...prevState.options,
        chart: {
          ...prevState.options.chart,
          type: value
        }
      }
    }));
  };

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
            <option value="area">Area</option>
            <option value="line">Line</option>
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
        <ReactApexChart 
          options={chartData.options} 
          series={chartData.series} 
          type={chartType} 
          height={450} 
        />
      </div>
      
      <div style={featureListStyle}>
        <h3 style={featureHeaderStyle}>ApexCharts Features in ARIA:</h3>
        <ul style={{ paddingLeft: '20px' }}>
          <li style={featureItemStyle}><strong>Annotations:</strong> Point markers, axis ranges, and region highlights</li>
          <li style={featureItemStyle}><strong>Reactivity:</strong> Dynamic data updates and theme switching</li>
          <li style={featureItemStyle}><strong>Interactivity:</strong> Tooltips, zooming, and chart type switching</li>
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