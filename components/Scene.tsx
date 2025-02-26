"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { ProjectCube } from "./ProjectCube"

export default function Scene({ projects, active, setActive }) {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {projects.map((project, index) => (
        <ProjectCube key={project.id} project={project} index={index} active={active === index} setActive={setActive} />
      ))}
    </Canvas>
  )
}

