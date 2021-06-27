import { useMetaData } from 'contexts/MetaData';
import { IMetaData } from 'contexts/MetaData/types';
import { useEffect } from 'react';

const useLoadBusinessRoles: () => Array<IMetaData> = () => {
  const {
    state: { rolesLoaded, roles },
    actions: { loadRoles },
  } = useMetaData();

  useEffect(() => {
    if (!rolesLoaded) loadRoles();
  }, [rolesLoaded, loadRoles]);

  return roles;
};
export default useLoadBusinessRoles;
