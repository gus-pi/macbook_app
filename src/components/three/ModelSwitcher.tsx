import { PresentationControls } from '@react-three/drei';
import { useRef } from 'react';
import MacbookModel16 from '../models/Macbook-16';
import * as THREE from 'three';
import MacbookModel14 from '../models/Macbook-14';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ANIMATION_DURATION = 0.8;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group: THREE.Group | null, opacity: number) => {
    if (!group) return;

    group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            (child.material as THREE.MeshStandardMaterial).transparent = true;
            gsap.to(child.material, { opacity: opacity, duration: ANIMATION_DURATION });
        }
    });
};

const moveGroup = (group: THREE.Group | null, xPos: number) => {
    if (!group) return;

    gsap.to(group.position, { x: xPos, duration: ANIMATION_DURATION, ease: 'power2.inOut' });
};

const ModelSwitcher = ({ scale, isMobile }: { scale: number; isMobile: boolean }) => {
    const smallMacbookRef = useRef<THREE.Group>(null);
    const largeMacbookRef = useRef<THREE.Group>(null);

    const showLargeMacbook = scale === 0.08 || scale === 0.05;

    useGSAP(() => {
        if (showLargeMacbook) {
            moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
            moveGroup(largeMacbookRef.current, 0);

            fadeMeshes(smallMacbookRef.current, 0);
            fadeMeshes(largeMacbookRef.current, 1);
        } else {
            moveGroup(smallMacbookRef.current, 0);
            moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

            fadeMeshes(smallMacbookRef.current, 1);
            fadeMeshes(largeMacbookRef.current, 0);
        }
    }, [scale]);

    const controlsConfig = {
        snap: true,
        speed: 1,
        zoom: 1,
        // polar: [-Math.PI, Math.PI],
        azimuth: [-Infinity, Infinity] as [number, number],
        config: { mass: 1, tension: 0, friction: 26 },
    };

    return (
        <>
            <PresentationControls {...controlsConfig}>
                <group ref={largeMacbookRef}>
                    <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
                </group>
            </PresentationControls>
            <PresentationControls {...controlsConfig}>
                <group ref={smallMacbookRef}>
                    <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
                </group>
            </PresentationControls>
        </>
    );
};
export default ModelSwitcher;
