import clsx from 'clsx';
import { useState } from 'react';
import useMacBookStore from '../store';
import { Canvas } from '@react-three/fiber';
import StudioLights from './three/StudioLights';
import ModelSwitcher from './three/ModelSwitcher';
import { useMediaQuery } from 'react-responsive';

const ProductViewer = () => {
    const { color, scale, setColor, setScale } = useMacBookStore();
    const [hintDismissed, setHintDismissed] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

    return (
        <section id="product-viewer" onPointerDown={() => setHintDismissed(true)}>
            <h2>Take a closer look.</h2>
            <div className="controls">
                <p className="info">
                    Macbook Pro Available in 14" & 16" in Space Gray or Dark colors
                </p>

                <div className="flex-center gap-5 mt-5">
                    <div className="color-control">
                        <div
                            onClick={() => setColor('#adb5bd')}
                            className={clsx('bg-neutral-300', color === '#adb5bd' && 'active')}
                        />
                        <div
                            onClick={() => setColor('#2e2c2e')}
                            className={clsx('bg-neutral-900', color === '#2e2c2e' && 'active')}
                        />
                    </div>

                    <div className="size-control">
                        <div
                            onClick={() => setScale(0.06)}
                            className={clsx(
                                scale === 0.06
                                    ? 'bg-white text-black'
                                    : 'bg-transparent text-white',
                            )}
                        >
                            <p>14"</p>
                        </div>
                        <div
                            onClick={() => setScale(0.08)}
                            className={clsx(
                                scale === 0.08
                                    ? 'bg-white text-black'
                                    : 'bg-transparent text-white',
                            )}
                        >
                            <p>16"</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx('drag-hint', hintDismissed && 'fade-out')}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                </svg>
                <span>Drag to rotate</span>
            </div>

            <Canvas id="canvas" camera={{ position: [0, 2, 5], fov: 50, near: 0.01, far: 100 }}>
                <StudioLights />

                <ModelSwitcher scale={isMobile ? scale - 0.03 : scale} isMobile={isMobile} />
            </Canvas>
        </section>
    );
};
export default ProductViewer;
