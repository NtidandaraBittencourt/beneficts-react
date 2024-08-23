import React, {useState} from 'react'
import EmployeeForm from '../components/EmployeeForm'

function Benefits() {
  const [employee, setEmployee] = useState(null);

  return (
    <div>
      <EmployeeForm onSubmit={setEmployee} />
    </div>
  )
}

export default Benefits
