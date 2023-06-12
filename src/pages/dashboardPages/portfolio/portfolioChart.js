import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const Chart = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept'],
        datasets: [
            {
                label: '',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#DDB05B',
                borderColor: '#DDB05B',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#DDB05B',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#DDB05B',
                pointHoverBorderColor: '#DDB05B',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [5, 10, 50, 20, 90, 100, 220],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value, index, values) {
                        return value + 'k';
                    }
                }
            },
        },
    };

    return (
        <div className='chart' style={{ height: 200 }}>
            <div>
            <h2>Income Overview</h2>
            <span>Select</span>
            </div>
            
            <Line data={data} options={options} />
        </div>
    );
};

export const DoughnutChart = ({user}) => {
    const downlines = user?.downlines
    const directReferral = downlines.filter((downline, id) => downline.level === 1)
    const indirectReferral = downlines.filter((downline) => downline.level !== 1)
    const data = {
        labels: ['Direct Downlines', 'Indirect Downlines'],
        datasets: [
            {
              label: '# of Votes',
              data: [directReferral?.length, indirectReferral?.length],
              backgroundColor: [
                '#111111',
                '#DDB05B',
              ],
              borderColor: [
                '#111111',
                '#DDB05B',
              ],
              borderWidth: 1,
            },
          ],

    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '50%', // Set the cutout to 50% for a half-doughnut effect
        rotation: -90, // Rotate the chart to make it start at the top
        circumference: 180, // Set the circumference to 180 degrees
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      };

    return (
        <div style={{height: '200px'}}>
    <Doughnut data={data} options={options}  />
    </div>
    )
  }
  