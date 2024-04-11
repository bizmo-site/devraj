'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { RunIcon } from '@codesandbox/sandpack-react';
import { PlayIcon } from 'lucide-react';

class Refresh extends React.Component {
  reloadPage = () => {
    window.location.reload();
  };

  render() {
    return (
      <Button onClick={this.reloadPage}>
        <PlayIcon className='h-4 w-4 text-background mr-2'></PlayIcon>
         <p>Run Code</p>
      </Button>
    );
  }
}

export default Refresh;
