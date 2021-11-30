export function PlayerBall(positionX, material) {
  const positionY = -3;
  const size = 1.8;

  return (
    <>
      <group position={[positionX, positionY, -3]}>
        <mesh receiveShadow castShadow>
          <sphereGeometry args={[size, 64, 64]} />
          <meshPhysicalMaterial
            ref={material}
            clearcoat={1}
            clearcoatRoughness={0}
            transmission={1}
            thickness={1.1}
            roughness={0}
            envMapIntensity={2}
          />
        </mesh>
      </group>
    </>
  );
}
