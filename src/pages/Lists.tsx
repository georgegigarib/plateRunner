import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlateList } from '@/types';
import { loadLists, saveList } from '@/lib/storage';
import { createPlateList, createRandomPlateList } from '@/lib/plateUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ListCard } from '@/components/lists/ListCard';
import { ListColorPicker } from '@/components/lists/ListColorPicker';
import { ArrowLeft, Plus, Shuffle } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { motion } from 'framer-motion';
import { ListColor } from '@/types';

const Lists: React.FC = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState<PlateList[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showRandomDialog, setShowRandomDialog] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListColor, setNewListColor] = useState<ListColor>('blue');
  const [randomPlateCount, setRandomPlateCount] = useState(10);

  useEffect(() => {
    setLists(loadLists());
  }, []);

  const handleCreateList = () => {
    if (newListName.trim()) {
      const list = createPlateList(newListName.trim(), newListColor);
      saveList(list);
      setLists(loadLists());
      setShowCreateDialog(false);
      setNewListName('');
      setNewListColor('blue');
      navigate(`/list/${list.id}`);
    }
  };

  const handleCreateRandomList = () => {
    if (newListName.trim() && randomPlateCount > 0) {
      const list = createRandomPlateList(newListName.trim(), randomPlateCount, newListColor);
      saveList(list);
      setLists(loadLists());
      setShowRandomDialog(false);
      setNewListName('');
      setNewListColor('blue');
      setRandomPlateCount(10);
      navigate(`/list/${list.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border p-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-display text-xl font-bold text-foreground flex-1">My Plate Lists</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto p-4 pb-24">
        {/* Action buttons */}
        <div className="flex gap-3 mb-6">
          <Button onClick={() => setShowCreateDialog(true)} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 btn-traffic">
            <Plus className="h-4 w-4 mr-2" />
            New List
          </Button>
          <Button onClick={() => setShowRandomDialog(true)} variant="outline" className="flex-1 border-accent text-accent hover:bg-accent/10 btn-traffic">
            <Shuffle className="h-4 w-4 mr-2" />
            Random List
          </Button>
        </div>

        {/* Lists */}
        {lists.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 text-muted-foreground">
            <p className="font-display text-lg mb-2">No lists yet</p>
            <p className="text-sm">Create your first plate list to get started</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {lists.map((list, index) => (
              <motion.div key={list.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <ListCard list={list} onClick={() => navigate(`/list/${list.id}`)} />
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Create List Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display">Create New List</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>List Name</Label>
              <Input
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="My Plates"
                className="bg-secondary border-border"
                onKeyDown={(e) => e.key === 'Enter' && handleCreateList()}
              />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <ListColorPicker value={newListColor} onChange={setNewListColor} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateList} disabled={!newListName.trim()} className="bg-primary text-primary-foreground">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Random List Dialog */}
      <Dialog open={showRandomDialog} onOpenChange={setShowRandomDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display">Create Random List</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>List Name</Label>
              <Input value={newListName} onChange={(e) => setNewListName(e.target.value)} placeholder="Random Plates" className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label>Number of Plates</Label>
              <Input
                type="number"
                value={randomPlateCount}
                onChange={(e) => setRandomPlateCount(Math.max(1, parseInt(e.target.value) || 1))}
                min={1}
                max={100}
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>Color</Label>
              <ListColorPicker value={newListColor} onChange={setNewListColor} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRandomDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateRandomList} disabled={!newListName.trim()} className="bg-accent text-accent-foreground">
              <Shuffle className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Lists;
