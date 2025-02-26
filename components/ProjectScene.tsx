"use client"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import dynamic from "next/dynamic"

const ProjectCube = dynamic(() => import("./ProjectCube"), { ssr: false })

export default function ProjectScene({ projects, active, setActive }) {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        {projects.map((project, index) => (
          <ProjectCube
            key={project.id}
            project={project}
            index={index}
            active={active === index}
            setActive={setActive}
          />
        ))}
      </Suspense>
    </Canvas>
  )
}

