import React, { Component } from 'react';
import is from 'is_js';
import { Line, Chart } from 'react-chartjs-2';
import Loading from '../components/Loading';


class UserEssayChart extends Component {
  componentWillMount() {
    Chart.pluginService.register({
      afterDraw: (chartInstance) => {
        let yValue;
        const yScale = chartInstance.scales['y-axis-0'];
        const canvas = chartInstance.chart;
        const ctx = canvas.ctx;
        const xAxe = chartInstance.scales[chartInstance.config.options.scales.xAxes[0].id];
        let index;
        let line;
        let style;
    
        if (chartInstance.options.horizontalLine) {
          for (index = 0; index < chartInstance.options.horizontalLine.length; index++) {
            line = chartInstance.options.horizontalLine[index];
    
            if (!line.style) {
              style = 'rgba(169,169,169, .6)';
            } else {
              style = line.style;
            }
    
            if (line.y) {
              yValue = yScale.getPixelForValue(line.y);
            } else {
              yValue = 0;
            }
    
            ctx.lineWidth = 3;
            if (yValue) {
              ctx.beginPath();
              ctx.moveTo(xAxe.left, yValue);
              ctx.lineTo(xAxe.right, yValue);
              ctx.strokeStyle = style;
              ctx.stroke();
            }
    
            if (line.text) {
              ctx.fillStyle = style;
              ctx.fillText(line.text, 0, yValue + ctx.lineWidth);
            }
          }
        }
      },
    });
  }
  render() {
    if (is.null(this.props.subjects)) {
      return <Loading />;
    }
    
    const subjects = {};
    this.props.subjects.forEach(sub => (
      subjects[sub.id] = sub.title
    ));
    const selected = this.props.essays[this.props.active];
    const labels = selected.essays.map(obj => obj.title);
    const scores = selected.essays.map(obj => obj.score);

    const data = {
      labels,
      datasets: [
        {
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(0, 145, 234, 0.4)',
          borderColor: '#0091EA',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#0091EA',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#0091EA',
          pointHoverBorderColor: '#0091EA',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          data: scores,
        },
      ],
    };

    const options = {
      legend: {
        display: false,
      },
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
        },
      },
      scales: {
        xAxes: [{
          display: false,
          gridLines: {
            display: true,
          },
          ticks: {
            minRotation: 45,
            padding: 50,
            type: 'category',
          },
        }],
        yAxes: [{
          display: true,
          gridLines: {
            display: true,
          },
          ticks: {
            suggestedMin: 450,
            suggestedMax: 850,
          },
        }],
      },
    };

 
    const noContent = (
      <div className="general-card__no-content">
        <div className="newton-pensando" />
        <div className="general-card__empty-msg">
          Aún no has agregado un ensayo de {subjects[this.props.active]}.
        </div>
      </div>
    );
    
    const header = this.props.mobile ? null : (
      <div className="general-card__header">
        <div className="general-card__title">Mi progreso en {subjects[this.props.active]}</div>
      </div>
    );
  
    return (
      <div className={`general-card ${this.props.mobile ? '' : 'general-card_desk'}`}>
        {header}
        <div className="general-card__chart">
          {is.empty(selected.essays) ? noContent : <Line data={data} options={options} />}
        </div>
      </div>
    );
  }
}
export default UserEssayChart;
