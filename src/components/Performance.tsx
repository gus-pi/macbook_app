import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';
import { performanceImages } from '../constants';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

const Performance = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const sectionRef = useRef(null);

    useGSAP(
        () => {
            const sectionEl = sectionRef.current;
            if (!sectionEl) return;

            // Text Animation
            gsap.fromTo(
                '.content p',
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: '.content p',
                        start: 'top bottom',
                        end: 'top center',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                },
            );

            if (isMobile) return;

            // Image Positioning Timeline
            const tl = gsap.timeline({
                defaults: { duration: 2, ease: 'power1.inOut', overwrite: 'auto' },
                scrollTrigger: {
                    trigger: sectionEl,
                    start: 'top bottom',
                    end: 'center center',
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Position Each Performance Image
            tl.to('.p1', { left: '5%', bottom: '65%' }, 0);
            tl.to('.p2', { right: '10%', bottom: '60%' }, 0);
            tl.to('.p3', { right: '-5%', bottom: '45%' }, 0);
            tl.to('.p4', { right: '-10%', bottom: '0%' }, 0);
            tl.to('.p6', { left: '2%', bottom: '30%' }, 0);
            tl.to('.p7', { left: '-5%', bottom: '0%' }, 0);
        },
        { scope: sectionRef, dependencies: [isMobile] },
    );
    return (
        <section id="performance" ref={sectionRef}>
            <h2>Next-level graphics performance. Game on.</h2>
            <div className="wrapper">
                {performanceImages.map((image) => (
                    <img key={image.id} src={image.src} alt={image.id} className={image.id} />
                ))}
            </div>

            <div className="content">
                <p>
                    Run graphics-intensive workflows with a responsiveness that keeps up with your
                    imagination. The M4 family of chips features a GPU with a second-generation
                    hardware-accelerated ray tracing engine that renders images faster, so{' '}
                    <span className="text-white">
                        gaming feels more immersive and realistic than ever.
                    </span>{' '}
                    And Dynamic Caching optimizes fast on-chip memory to dramatically increase
                    average GPU utilization — driving a huge performance boost for the most
                    demanding pro apps and games.
                </p>
            </div>
        </section>
    );
};
export default Performance;
