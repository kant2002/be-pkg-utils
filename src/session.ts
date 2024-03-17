import { DiiaOfficeStatus, EResidentSession, ProfileFeature, UserFeatures, UserSession } from '@kant2002-diia-inhouse/types'

export function profileFeaturesToList(features: UserFeatures): ProfileFeature[] {
    const featuresList: ProfileFeature[] = []

    Object.entries(features).forEach(([key, value]: [string, unknown]) => value && featuresList.push(<ProfileFeature>key))

    return featuresList.filter((feature) => {
        if (feature !== ProfileFeature.office) {
            return true
        }

        return features?.[feature]?.status === DiiaOfficeStatus.ACTIVE
    })
}

export function extractProfileFeatures(session: UserSession | EResidentSession): ProfileFeature[] {
    if (!('features' in session) || !session.features) {
        return []
    }

    return profileFeaturesToList(session.features)
}
