import * as React from 'react';
import * as store from '../../stores/FileStore';
import { navigate } from 'gatsby';
import { observer, inject } from 'mobx-react';
import { Button } from 'evergreen-ui'

interface Props {
  fileStore: store.FileStore
}

@inject('fileStore')
@observer
class SelectFile extends React.Component<Props> {
  inputRef?:HTMLInputElement = undefined
  setFile = (files: FileList) => {
   if (files[0] && this.props.fileStore) {
     this.props.fileStore.set(files[0])
     navigate('/analyze')
   }
  }
  onFileSelectionClick = (e: React.SyntheticEvent) => {
    if (this.inputRef) {
      this.inputRef.click()
    }
  }
  render() {
    return (
      <>
      <Button 
        height={40}
        onClick={this.onFileSelectionClick}
        marginTop='2em'
        appearance='primary'
        intent='none'>
        Select My File
      </Button>
      <input  
        style={{ display: 'none', opacity: 0 }}
        ref={(ref: HTMLInputElement) => this.inputRef = ref}
        onChange={(e: React.SyntheticEvent) => this.setFile(e.target.files)}
        type='file'/>
      </>
    )
  }
}

export default SelectFile