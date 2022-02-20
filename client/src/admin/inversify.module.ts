import { AsyncContainerModule, interfaces } from 'inversify';
import { SYMBOLS } from './types';
import { getAllNodeSummary } from '../api/post';
import Node from '@/src/data-binding/Model/PostGraph/Node/inversified';
import { ConstructorParam as PostNodeConstructorParam } from '@/src/data-binding/Model/PostGraph/Node';
import PostGraph from '../data-binding/Model/PostGraph/inversified';
import { ParameterizableNewable } from '../inversify';
import EBAdmin from './EBAdmin/inversified';
import EBGraphVis from './EBAdmin/EBGraphVis';
import PostGraphAppendNodeNotifier from '@/src/data-binding/ModelNotifier/PostGraph/AppendNode';
import PostGraphAppendNodeObserver from '@/src/data-binding/IObserver/EBGraphVis/AppendNode/inversified';
import PostGraphDeleteNodeNotifier from '@/src/data-binding/ModelNotifier/PostGraph/DeleteNode';
import PostGraphDeleteNodeObserver from '@/src/data-binding/IObserver/EBGraphVis/DeleteNode/inversified';
import NewDialogOkTask from '@/src/admin/EBAdmin/EBNewDialogPopup/EBNewDialog/Handler/OkTask';
import NewDialogOkDrawNode from './EBAdmin/EBNewDialogPopup/EBNewDialog/Handler/OkTask/DrawNode';
import NewDialogOkHideNode from './EBAdmin/EBNewDialogPopup/EBNewDialog/Handler/OkTask/HideNode';
import NewDialogOkHandler from './EBAdmin/EBNewDialogPopup/EBNewDialog/Handler/ok';
import NewDialogCloseHandler from './EBAdmin/EBNewDialogPopup/EBNewDialog/Handler/close';
import EBNewDialog from './EBAdmin/EBNewDialogPopup/EBNewDialog';
import EBNewDialogPopup from './EBAdmin/EBNewDialogPopup';
import ContextMenuNewSelection from './EBAdmin/EBGraphVis/ContextMenuPopup/NewSelection';
import ContextMenuPopup from './EBAdmin/EBGraphVis/ContextMenuPopup';
import ContextMenuHandler from './EBAdmin/EBGraphVis/Handler/ContextMenu';
import EBNewDialogBody from './EBAdmin/EBNewDialogPopup/EBNewDialog/EBNewDialogBody';
import NewNode from './data-binding/Model/NewNode';
import NewNodeInput from './EBAdmin/EBNewDialogPopup/EBNewDialog/EBNewDialogBody/Input';
import NewNodeInputHandler from './EBAdmin/EBNewDialogPopup/EBNewDialog/EBNewDialogBody/Input/Handler';
import NodeContextMenuPopup from './EBAdmin/EBGraphVis/NodeContextMenuPopup';
import DeleteSelection from './EBAdmin/EBGraphVis/NodeContextMenuPopup/DeleteSelection';
import NodeContextMenuSelectedId from '@/src/data-binding/Model/NodeContextMenuSelectedId';
import EBEditorPopup from './EBAdmin/EBEditorPopup';
import EBEditorOkButton from '@/src/admin/EBAdmin/EBEditorPopup/EBEditorPopupBody/Bottom/OkButton';
import EBEditorCancelButton from '@/src/admin/EBAdmin/EBEditorPopup/EBEditorPopupBody/Bottom/CancelButton';
import EBEditorPopupBody from './EBAdmin/EBEditorPopup/EBEditorPopupBody';
import EditingPostId from './data-binding/Model/EditingPostId';
import EditingPostIdNotifier from './data-binding/ModelNotifier/EditingPostId';
import EditingPostIdObserver from './data-binding/Observer/EditingPostId';
import EditingPost from './data-binding/Model/EditingPost';
import EditingPostNotifier from './data-binding/ModelNotifier/EditingPost';
import EditingPostObserver from './data-binding/Observer/EditingPost'
import EBEditor from './EBAdmin/EBEditorPopup/EBEditorPopupBody/EBEditor';
import EditorPopupBodyBottom from './EBAdmin/EBEditorPopup/EBEditorPopupBody/Bottom';
import EditorPopupBodyTop from './EBAdmin/EBEditorPopup/EBEditorPopupBody/Top';

const module = new AsyncContainerModule(
  async (
    bind: interfaces.Bind,
  ) => {
    bind<PostNodeConstructorParam[]>(SYMBOLS.PostNodeSummaries).toConstantValue(
      await getAllNodeSummary(),
    );
    bind<PostGraph>(SYMBOLS.PostGraph).to(PostGraph).inSingletonScope();
    bind<ParameterizableNewable<Node, ConstructorParameters<typeof Node>>>(SYMBOLS.PostNodeNewable).toConstructor(Node);
    bind<EBAdmin>(SYMBOLS.EBAdmin).to(EBAdmin);
    bind<EBGraphVis>(SYMBOLS.EBGraphVis).to(EBGraphVis).inSingletonScope();
    bind<PostGraphAppendNodeNotifier>(SYMBOLS.PostGraphAppendNodeNotifier).to(PostGraphAppendNodeNotifier).inSingletonScope();
    bind<PostGraphAppendNodeObserver>(SYMBOLS.PostGraphAppendNodeObserver).to(PostGraphAppendNodeObserver).inSingletonScope();
    bind<PostGraphDeleteNodeNotifier>(SYMBOLS.PostGraphDeleteNodeNotifier).to(PostGraphDeleteNodeNotifier).inSingletonScope();
    bind<PostGraphDeleteNodeObserver>(SYMBOLS.PostGraphDeleteNodeObserver).to(PostGraphDeleteNodeObserver).inSingletonScope();
    bind<NewDialogOkTask>(SYMBOLS.NewDialogOkTask).to(NewDialogOkTask);
    bind<NewDialogOkDrawNode>(SYMBOLS.NewDialogOkDrawNode).to(NewDialogOkDrawNode);
    // bind<NewDialogOkHideNode>(SYMBOLS.NewDialogOkHideNode).to(NewDialogOkHideNode);
    bind<ParameterizableNewable<NewDialogOkHideNode, ConstructorParameters<typeof NewDialogOkHideNode>>>(SYMBOLS.NewDialogOkHideNode).toConstructor(NewDialogOkHideNode);
    bind<NewDialogOkHandler>(SYMBOLS.NewDialogOkHandler).to(NewDialogOkHandler);
    bind<NewDialogCloseHandler>(SYMBOLS.NewDialogCloseHandler).to(NewDialogCloseHandler);
    bind<EBNewDialog>(SYMBOLS.EBNewDialog).to(EBNewDialog);
    bind<EBNewDialogBody>(SYMBOLS.EBNewDialogBody).to(EBNewDialogBody);
    bind<EBNewDialogPopup>(SYMBOLS.EBNewDialogPopup).to(EBNewDialogPopup).inSingletonScope();
    bind<ContextMenuNewSelection>(SYMBOLS.ContextMenuNewSelection).to(ContextMenuNewSelection);
    bind<ContextMenuPopup>(SYMBOLS.ContextMenuPopup).to(ContextMenuPopup).inSingletonScope();
    bind<ContextMenuHandler>(SYMBOLS.ContextMenuHandler).to(ContextMenuHandler);
    bind<NewNode>(SYMBOLS.NewNodeModel).to(NewNode).inSingletonScope();
    bind<NewNodeInput>(SYMBOLS.NewNodeInput).to(NewNodeInput).inSingletonScope();
    bind<NewNodeInputHandler>(SYMBOLS.NewNodeInputHandler).to(NewNodeInputHandler).inSingletonScope();
    bind<NodeContextMenuPopup>(SYMBOLS.NodeContextMenuPopup).to(NodeContextMenuPopup).inSingletonScope();
    bind<DeleteSelection>(SYMBOLS.DeleteSelection).to(DeleteSelection).inSingletonScope();
    // bind<NodeContextMenuHandler>(SYMBOLS.NodeContextMenuHandler).to(NodeContextMenuHandler);
    bind<NodeContextMenuSelectedId>(SYMBOLS.NodeContextMenuSelectedId).to(NodeContextMenuSelectedId).inSingletonScope();
    bind<EBEditorPopup>(SYMBOLS.EBEditorPopup).to(EBEditorPopup).inSingletonScope();
    bind<EBEditorPopupBody>(SYMBOLS.EBEditorPopupBody).to(EBEditorPopupBody).inSingletonScope();
    bind<EBEditorOkButton>(SYMBOLS.EBEditorOkButton).to(EBEditorOkButton);
    bind<EBEditorCancelButton>(SYMBOLS.EBEditorCancelButton).to(EBEditorCancelButton);
    bind<EditingPostId>(SYMBOLS.EditingPostId).to(EditingPostId).inSingletonScope();
    bind<EditingPostIdNotifier>(SYMBOLS.EditingPostIdNotifier).to(EditingPostIdNotifier).inSingletonScope();
    bind<EditingPostIdObserver>(SYMBOLS.EditingPostIdObserver).to(EditingPostIdObserver).inSingletonScope();
    bind<EditingPost>(SYMBOLS.EditingPost).to(EditingPost).inSingletonScope();
    bind<EBEditor>(SYMBOLS.EBEditor).to(EBEditor).inSingletonScope();
    bind<EditorPopupBodyBottom>(SYMBOLS.EditorPopupBodyBottom).to(EditorPopupBodyBottom).inSingletonScope();
    bind<EditorPopupBodyTop>(SYMBOLS.EditorPopupBodyTop).to(EditorPopupBodyTop).inSingletonScope();
    bind<EditingPostNotifier>(SYMBOLS.EditingPostNotifier).to(EditingPostNotifier).inSingletonScope();
    bind<EditingPostObserver>(SYMBOLS.EditingPostObserver).to(EditingPostObserver).inSingletonScope();
  }
);

export default module;
