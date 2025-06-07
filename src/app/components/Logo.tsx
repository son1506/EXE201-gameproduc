import logoImage from '../../app/assets/Logo_page.png';

interface LogoProps {
    collapsed: boolean;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ collapsed, className }) => {
    return (
        <div className={`flex items-center gap-2 transition-all duration-300 ${className}`}>
            <img
                src={logoImage}
                alt="Logo"
                className="h-15 w-15 object-contain"
            />
            {/* {!collapsed && <span className="text-lg font-semibold">Logo web</span>} */}
        </div>
    );
};

export default Logo;
