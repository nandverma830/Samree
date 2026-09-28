import logoImg from '../../assets/logo.png';

export default function SamreeLogo({ height = 32, className = '', style = {} }) {
  const pixelHeight = typeof height === 'number' ? `${height}px` : height;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 1, ...style }}>
      <img
        src={logoImg}
        alt="SAMREE"
        className={`samree-asset-logo ${className}`}
        style={{
          height: pixelHeight,
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}
