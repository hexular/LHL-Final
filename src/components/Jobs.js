import React from 'react';
import Open from './Job/Open'

export default function Jobs(props) {

  const jobs = [
    {
      name: "Job 1",
      user: "User 1",
      distance: "1.5km",
      tags: ["Construction", "Cleaning"]
    },
    {
      name: "Job 2",
      user: "User 2",
      distance: "2.5km",
      tags: ["Cleaning"]
    },
    {
      name: "Job 3",
      user: "User 3",
      distance: "5.5km",
      tags: ["Landscaping", "Computer Science", "Legal Advice"]
    },

  ]

  const OpenJobs = jobs.map(job => {
    return (
      <Open
        job={job.name}
        user={job.user}
        distance={job.distance}
        tags={job.tags.join(" ")} />
    )
  })

  return (
    <ul>
      {OpenJobs}
    </ul>
  )
}