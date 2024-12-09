export function renameField(array:any) { 
  return array.map((item:any) => { 
  // Создаем новый объект с полем 'label' вместо 'name' 
    const { name, ...rest } = item; 
    return { label: name, ...rest }; 
  }); 
}