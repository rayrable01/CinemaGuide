import styles from '../../pages/PersonalPage/PersonalPage.module.css'
import { filmSchemaType, removeFavoriteFilm } from '../../api/filmsRequests'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../api/queryClient'
import { FC } from 'react'

interface RemoveButtonProps {
    data: filmSchemaType,
}

export const RemoveButton: FC<RemoveButtonProps> = ({data}) => {

    const removeFilmMutation = useMutation({
        mutationFn: () => removeFavoriteFilm(data.id),
        onSuccess() {
            console.log(`${data.id} successfully removed from favorites`);
            queryClient.invalidateQueries({queryKey: ['favoriteFilms']})
        },
        onError: (error) => {
            console.log(`${error.message} failed to add to favorites`)
        }
    }, queryClient);
    
    const handleClick = () => {
        removeFilmMutation.mutate();
    }

    return (
        <span className={styles.removeButton} onClick={() => handleClick()}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" fill="black" />
            </svg>
        </span>
    )
}