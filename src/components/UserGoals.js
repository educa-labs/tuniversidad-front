import React from 'react';
import EditIcon from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
import { BarChart, Bar, Tooltip, XAxis, YAxis } from 'recharts';


const data = [
  { name: 'Yo', value: 623 },
  { name: 'Mi meta', value: 700 },
  { name: 'Corte 2016', value: 683 },
];

function UserGoals({ goals }) {
  function renderGoal(goal) {
    return (
      <div className="general-card__goal" key={goal.id}>
        {goal.title}
      </div>
    );
  }
  if (goals === null) return <div>Cargando ... </div>;

  return (
    <div className="general-card">
      <div className="row">
        <div className="general-card__title">Mis Metas</div>
        <div className="general-card__edit-button">
          <IconButton><EditIcon color="#424242" /></IconButton>
        </div>
      </div>
      <BarChart
        width={400}
        height={200}
        data={data}
        layout="vertical"
        barGap={1}
       >
        <XAxis type="number" />
        <Tooltip />
        <Bar dataKey="value" fill="#0091EA" label />
      </BarChart>
      {goals.map(goal => renderGoal(goal))}
    </div>
  );
}

export default UserGoals;
