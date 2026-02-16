export const plainArryPermissions = (permissionsList: {id: string, name: string}[]) : string[] => {
  return permissionsList.map(permission => permission.id);
}

export const filterListPermissionsWithPermissionFromRol = (permissionsList: any[], rolPermissions: {id: string, name: string}[]) : any[] => {
  const rolPermissionIds = rolPermissions.map(permission => permission.id);
  let list = permissionsList.map(permission => rolPermissionIds.includes(permission.id) ? { ...permission, checked: true } : { ...permission, checked: false });
  list = list.sort((a, b) => {
    if(a.checked && !b.checked) return -1;
    if(!a.checked && b.checked) return 1;
    return 0;
  });
  return list;
}

export const orderPermissionsListByText = (permissionsList: any[], text: string) : any[] => {
  const lowerText = text.toLowerCase();
  const filtered = permissionsList.filter(permission => permission.name.toLowerCase().includes(lowerText));
  const notFiltered = permissionsList.filter(permission => !permission.name.toLowerCase().includes(lowerText));
  return [...filtered, ...notFiltered];
}
