import React from 'react';
import '../benchmarks/benchmarks.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Banner from '../../components/banner/Banner';

function Benchmarks() {
  const data = [
    {
      name: 'Infrastructure',
      uv: 4000,
      pv: 2400,
      mv: 3500,
      amt: 2400
    },
    {
      name: 'education',
      uv: 3000,
      pv: 1398,
      mv: 4100,
      amt: 2210
    },
    {
      name: 'Governance',
      uv: 2000,
      pv: 9800,
      mv: 7500,
      amt: 2290
    },
    {
      name: 'Environment',
      uv: 2780,
      pv: 3908,
      mv: 4100,
      amt: 2000
    },
    {
      name: 'Quality of Life',
      uv: 1890,
      pv: 4800,
      mv: 2600,
      amt: 2181
    },
    {
      name: 'Mobility',
      uv: 2390,
      pv: 3800,
      mv: 6541,
      amt: 2500
    },
    {
      name: 'Smart Economy',
      uv: 3490,
      pv: 4300,
      mv: 7500,
      amt: 2100
    }
  ];
  return (
    <>
      <Banner title='Benchmarks' />
      <div className='section__padding'>
        <div className='benchmarks__container'>
          <div
            className='benchmarks__chart'
            style={{ width: '100%', height: '400px' }}
          >
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                className='linechart'
                width={1300}
                height={300}
                data={data}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='mv' stroke='#343242' />
                <Line
                  type='monotone'
                  dataKey='pv'
                  stroke='#8884d8'
                  activeDot={{ r: 8 }}
                />
                <Line type='monotone' dataKey='uv' stroke='#82ca9d' />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className='benchmarks__Legends'>
            <div className='left-legend'>
              <h2>Legends</h2>
              <div className='legends'>
                <div className='legends-flex'>
                  <div className='first__legends'></div>
                  <div>Kicukiro</div>
                </div>
                <div className='legends-flex'>
                  <div className='second__legends'></div>
                  <div>Kicukiro</div>
                </div>
                <div className='legends-flex'>
                  <div className='third__legends'></div>
                  <div>Kicukiro</div>
                </div>
              </div>
            </div>
            <div className='right-legend'>
              <h2>Select the cities:</h2>
              <div className='legends'>
                <div className='legends-flex'>
                  <h3>City 1:</h3>
                  <select>
                    <option value='volvo'>Volvo</option>
                    <option value='saab'>Saab</option>
                    <option value='vw'>VW</option>
                    <option value='audi' selected>
                      Audi
                    </option>
                  </select>
                </div>
                <div className='legends-flex'>
                  <h3>City 2:</h3>
                  <select>
                    <option value='volvo'>Volvo</option>
                    <option value='saab'>Saab</option>
                    <option value='vw'>VW</option>
                    <option value='audi' selected>
                      Audi
                    </option>
                  </select>
                </div>
                <div className='legends-flex'>
                  <h3>City 3:</h3>
                  <select>
                    <option value='volvo'>Volvo</option>
                    <option value='saab'>Saab</option>
                    <option value='vw'>VW</option>
                    <option value='audi' selected>
                      Audi
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Benchmarks;
