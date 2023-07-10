import { TopMenu } from '../components/topMenu/topMenu';

export const NoSignedLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <TopMenu/>
            {children}
        </div>
    )
}
