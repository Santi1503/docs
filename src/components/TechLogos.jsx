import { RiReactjsLine, RiGithubFill, RiAngularjsLine } from "react-icons/ri";
import { TbBrandAws, TbBrandPython, TbBrandDocker, TbBrandTailwind, TbBrandVite, TbBrandFramerMotion  } from "react-icons/tb";
import { SiMongodb, SiKubernetes, SiJenkins } from "react-icons/si";
import { DiMysql } from "react-icons/di";
import { FaNodeJs } from "react-icons/fa";
import { BiLogoFirebase } from "react-icons/bi";
  
// Redefinimos cada logo como un componente que usa los iconos de lucide-react
export const ReactLogo = () => (
    <RiReactjsLine className="w-16 h-16" />
);
  
export const ViteLogo = () => (
    <TbBrandVite className="w-16 h-16" />
);
  
export const AngularLogo = () => (
    <RiAngularjsLine className="w-16 h-16" />
);
  
export const NodejsLogo = () => (
    <FaNodeJs className="w-16 h-16" />
);
  
export const TailwindcssLogo = () => (
    <TbBrandTailwind className="w-16 h-16" />
);
  
export const PythonLogo = () => (
    <TbBrandPython className="w-16 h-16" />
);
  
export const MongoDBLogo = () => (
    <SiMongodb className="w-16 h-16" />
);
  
export const MySQLLogo = () => (
    <DiMysql className="w-16 h-16" />
);
  
export const FirebaseLogo = () => (
    <BiLogoFirebase className="w-16 h-16" />
);
  
export const GithubLogo = () => (
    <RiGithubFill className="w-16 h-16" />
);
  
export const JenkinsLogo = () => (
    <SiJenkins className="w-16 h-16" />
);
 
export const DockerLogo = () => (
    <TbBrandDocker className="w-16 h-16" />
);
  
export const AWSLogo = () => (
    <TbBrandAws className="w-16 h-16" />
);
  
export const FramerMotionLogo = () => (
    <TbBrandFramerMotion className="w-16 h-16" />
);

export const KubernetesLogo = () => {
    <SiKubernetes className="w-16 h-16" />
}
  
// Mantenemos el mismo objeto de techLogos
export const techLogos = {
    react: ReactLogo,
    vite: ViteLogo,
    angular: AngularLogo,
    nodejs: NodejsLogo,
    tailwindcss: TailwindcssLogo,
    python: PythonLogo,
    mongodb: MongoDBLogo,
    mysql: MySQLLogo,
    firebase: FirebaseLogo,
    github: GithubLogo,
    jenkins: JenkinsLogo,
    docker: DockerLogo,
    aws: AWSLogo,
    framermotion: FramerMotionLogo,
};