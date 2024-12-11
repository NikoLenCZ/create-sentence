import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { startEditing, deleteSentence } from '../../redux/sentenceService';
import { useDispatch } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';

export const SentenceList = () => {
  const dispatch = useDispatch();
  const sentences = useSelector((state: RootState) => state.sentences);
  const editIndex = useSelector((state: RootState) => state.sentences.editIndex);

  const handleEdit = (index: number) => {
    dispatch(startEditing(index));
  };
  const handleDelete = (index: number) => {
    dispatch(deleteSentence(index));
  };

  return (
    <ul style={ { marginTop: '2rem', padding: 0, listStylePosition: 'inside' } }>
      { sentences.sentences.map((sentence, index) => (
        <li key={ index } style={ {
          ...(editIndex !== null && editIndex !== index && {
            marginBlock: '.8rem',
            opacity: 0.4,
          }),
          ...(editIndex === index && {
            textShadow: '2px 2px 4px rgba(156, 39, 176, 0.55)'
          })
        } }>
          { sentence.who } { sentence.what } { sentence.when } { sentence.where }.
          { editIndex === null && (
            <>
              <Tooltip title='Upravit'>
                <IconButton color='info' onClick={ () => handleEdit(index) }>
                  <EditIcon sx={ { marginLeft: '0.5rem' } } fontSize='small' />
                </IconButton>
              </Tooltip>
              <span style={ { color: 'gray', opacity: 0.5 } }>|</span>
              <Tooltip title='Smazat'>
                <IconButton color='error' onClick={ () => handleDelete(index) }>
                  <DeleteForever sx={ { marginLeft: '0.5rem' } } fontSize='small' />
                </IconButton>
              </Tooltip>
            </>
          ) }
        </li>
      )) }
    </ul>
  );
};