import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  className = '',
  children,
  onClick,
  hoverable = false,
  headerContent,
  footerContent,
}) => {
  const cardClasses = `
    bg-white rounded-lg shadow-md overflow-hidden
    ${hoverable ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
      {(title || subtitle || headerContent) && (
        <div className="px-4 py-3 border-b border-gray-100">
          {headerContent ? (
            headerContent
          ) : (
            <>
              {title && <h3 className="text-lg font-medium">{title}</h3>}
              {subtitle && <p className="text-sm text-text-secondary mt-1">{subtitle}</p>}
            </>
          )}
        </div>
      )}
      <div className="p-4">{children}</div>
      {footerContent && (
        <div className="px-4 py-3 bg-background-subtle border-t border-gray-100">
          {footerContent}
        </div>
      )}
    </div>
  );
};

export default Card;