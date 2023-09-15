import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

 
const  Progress = ({project})=> {
  const data = {
    labels: ['finished', 'started', 'not started'],
    datasets: [
      {
        label: 'Percentage',
        data: [project.finished.toFixed(2), project.started.toFixed(2), project.notStarted.toFixed(2)],
        backgroundColor: [
          'green',
          'orange',
          'red',
          
        ],
        
      },
    ],
  };
  
  return <>
    <section className="position-relative py-4 py-xl-5">
    <div className="container">
        <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
                <h2>Quick View</h2>
                <p className="w-lg-50"></p>
            </div>
        </div>
        <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
                <div className="card mb-5">
                    <div className="card-body d-flex flex-column align-items-center">
                    <Doughnut data={data} />

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  </> ;
}
export default Progress;