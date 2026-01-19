import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlateList, Plate } from '@/types';
import { getListById, saveList, deleteList as deleteListFromStorage } from '@/lib/storage';
import { createPlate, generateRandomPlate, LIST_COLORS, exportToCSV } from '@/lib/plateUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PlateInput } from '@/components/plates/PlateInput';
import { PlateTextarea } from '@/components/plates/PlateTextarea';
import { PlateListEditor } from '@/components/plates/PlateListEditor';
import { ListColorPicker } from '@/components/lists/ListColorPicker';
import { SpeedControl } from '@/components/playback/SpeedControl';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ArrowLeft, Play, Trash2, Edit2, Shuffle, Settings, Download, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const ListDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [list, setList] = useState<PlateList | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    if (id) {
      const loadedList = getListById(id);
      if (loadedList) {
        setList(loadedList);
        setEditName(loadedList.name);
      } else {
        navigate('/lists');
      }
    }
  }, [id, navigate]);

  const handleSave = (updatedList: PlateList) => {
    saveList(updatedList);
    setList(updatedList);
  };

  const handleAddPlate = (value: string) => {
    if (list) {
      const newPlate = createPlate(value);
      const updatedList = {
        ...list,
        plates: [...list.plates, newPlate],
      };
      handleSave(updatedList);
    }
  };

  const handleAddPlates = (plates: Plate[]) => {
    if (list) {
      const updatedList = {
        ...list,
        plates: [...list.plates, ...plates],
      };
      handleSave(updatedList);
    }
  };

  const handlePlatesChange = (plates: Plate[]) => {
    if (list) {
      handleSave({ ...list, plates });
    }
  };

  const handleIntervalChange = (intervalSeconds: number) => {
    if (list) {
      handleSave({ ...list, intervalSeconds });
    }
  };

  const handleAnimationSpeedChange = (animationSpeed: number) => {
    if (list) {
      handleSave({ ...list, animationSpeed });
    }
  };

  const handleNameSave = () => {
    if (list && editName.trim()) {
      handleSave({ ...list, name: editName.trim() });
      setIsEditing(false);
    }
  };

  const handleColorChange = (color: typeof list.color) => {
    if (list) {
      handleSave({ ...list, color });
    }
  };

  const handleDelete = () => {
    if (id) {
      deleteListFromStorage(id);
      navigate('/lists');
    }
  };

  const handleAddRandom = () => {
    if (list) {
      const newPlate = createPlate(generateRandomPlate());
      const updatedList = {
        ...list,
        plates: [...list.plates, newPlate],
      };
      handleSave(updatedList);
    }
  };

  const handlePlay = () => {
    if (list && list.plates.length > 0) {
      navigate(`/playback?listId=${list.id}`);
    }
  };

  const handleExportCSV = () => {
    if (list) {
      exportToCSV(list);
    }
  };

  if (!list) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border p-4 shadow-sm">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Back & Title */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/lists')}
                className="text-muted-foreground hover:text-foreground shrink-0 rounded-full hover:bg-secondary/80"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>

              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={cn('w-4 h-12 rounded-full shrink-0', LIST_COLORS[list.color])} />

                {isEditing ? (
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onBlur={handleNameSave}
                    onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                    className="flex-1 font-display text-2xl font-bold bg-secondary border-border h-10 px-2"
                    autoFocus
                  />
                ) : (
                  <h1
                    onClick={() => setIsEditing(true)}
                    className="font-display text-2xl font-bold text-foreground cursor-pointer hover:text-primary transition-colors truncate flex items-center gap-3 group"
                  >
                    {list.name}
                    <Edit2 className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h1>
                )}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-border bg-secondary/30">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 overflow-hidden" align="end">
                  <div className="p-4 bg-muted/30 border-b border-border">
                    <h3 className="font-semibold">Playback Settings</h3>
                  </div>
                  <div className="p-4">
                    <SpeedControl
                      value={list.intervalSeconds}
                      onChange={handleIntervalChange}
                      animationSpeed={list.animationSpeed ?? 1.5}
                      onAnimationSpeedChange={handleAnimationSpeedChange}
                      className="w-full border-0 shadow-none p-0 bg-transparent"
                    />
                  </div>
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                    <MoreVertical className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleExportCSV}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-destructive focus:text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete List
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                onClick={handlePlay}
                disabled={list.plates.length === 0}
                className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90 btn-traffic h-10 px-6 font-display tracking-wide shadow-lg shadow-primary/20"
              >
                <Play className="h-4 w-4 mr-2 fill-current" />
                PLAY
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto p-6 pb-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-start">
          {/* Sidebar Controls */}
          <div className="space-y-6 md:sticky md:top-24">
            <div className="glass-card p-5 rounded-xl space-y-4">
              <div>
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">List Color</Label>
                <ListColorPicker value={list.color} onChange={handleColorChange} />
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl space-y-4">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">Add Plates</Label>
              <Tabs defaultValue="single" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
                  <TabsTrigger value="single" className="text-xs">
                    Manual
                  </TabsTrigger>
                  <TabsTrigger value="bulk" className="text-xs">
                    Bulk
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="single" className="mt-4 space-y-3">
                  <PlateInput onAddPlate={handleAddPlate} />
                  <Button variant="outline" onClick={handleAddRandom} className="w-full border-dashed border-border">
                    <Shuffle className="h-4 w-4 mr-2" />
                    Add Random
                  </Button>
                </TabsContent>
                <TabsContent value="bulk" className="mt-4">
                  <PlateTextarea onAddPlates={handleAddPlates} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Main Plate List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">
                Plates
                <span className="ml-2 text-muted-foreground text-sm font-sans font-normal bg-secondary px-2 py-0.5 rounded-full">{list.plates.length}</span>
              </h2>
            </div>

            <div className="bg-card/50 rounded-xl border border-border/50 p-1 min-h-[400px]">
              <PlateListEditor plates={list.plates} onPlatesChange={handlePlatesChange} />
            </div>
          </div>
        </div>
      </main>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-destructive">Delete List</DialogTitle>
            <DialogDescription>Are you sure you want to delete "{list.name}"? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ListDetail;
