import { DashboardLayout } from '@/layouts/dashboardLayout/dashboardLayout'
import { useTranslation } from 'react-i18next';

const Project = () => {
    const { t } = useTranslation();

    return (
        <DashboardLayout
            main={
                <>
                    <h1>{t("coming_soon")}</h1>
                </>
            }
        />
    )

}

export default Project