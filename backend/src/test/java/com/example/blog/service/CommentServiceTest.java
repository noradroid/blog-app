package com.example.blog.service;

import static com.example.blog.service.CommentHelper.content;
import static com.example.blog.service.CommentHelper.mockComment;
import static com.example.blog.service.PostHelper.mockPost;
import static com.example.blog.service.UserHelper.mockUserA;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

import com.example.blog.constants.StatusConstants;
import com.example.blog.domain.Comment;
import com.example.blog.domain.Post;
import com.example.blog.domain.User;
import com.example.blog.exception.EntityDeletedException;
import com.example.blog.exception.ResponseCodeException;
import com.example.blog.repository.CommentRepository;
import com.example.blog.service.dto.comment.CommentDto;
import com.example.blog.service.dto.comment.CreateCommentRequestDto;
import com.example.blog.service.dto.comment.UpdateCommentRequestDto;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    @Mock
    CommentRepository commentRepository;

    @Mock
    UserService userService;

    @Mock
    PostService postService;

    @InjectMocks
    CommentService commentService;

    User userA = mockUserA();

    Post activePost = mockPost(userA, true);

    Post deletedPost = mockPost(userA, false);

    Comment deletedComment = mockComment(userA, activePost, null, false);

    @Test
    void getAllComments_returnActiveComments() {
        List<Comment> commentObjs = List.of(mockComment(userA, activePost, null, true));
        List<CommentDto> expected = commentObjs.stream().map(CommentDto::new).toList();
        when(commentRepository.findAllByActive(StatusConstants.ACTIVE)).thenReturn(commentObjs);
        List<CommentDto> actual = commentService.getAllComments();
        assertEquals(expected.size(), actual.size());
        assertEquals(expected, actual);
    }

    @Test
    void getTopLevelCommentsOfPost_returnTopLevelComments() {
        List<Comment> commentObjs = List.of(mockComment(userA, activePost, null, true));
        List<CommentDto> expected = commentObjs.stream().map(CommentDto::new).toList();
        when(commentRepository.findAllByPostIdAndParentIdIsNull(activePost.getId())).thenReturn(
            commentObjs);
        List<CommentDto> actual = commentService.getTopLevelCommentsOfPost(activePost.getId());
        assertEquals(expected.size(), actual.size());
        assertEquals(expected, actual);
    }

    @Test
    void getCommentsOfParent_returnCommentsOfParent() {
        Comment parent = mockComment(userA, activePost, null, true);
        List<Comment> commentObjs = List.of(mockComment(userA, activePost, parent, true));
        List<CommentDto> expected = commentObjs.stream().map(CommentDto::new).toList();
        when(commentRepository.findAllByParentId(parent.getId())).thenReturn(commentObjs);
        List<CommentDto> actual = commentService.getCommentsOfParent(parent.getId());
        assertEquals(expected.size(), actual.size());
        assertEquals(expected, actual);
    }

    @Test
    void getCommentsByUser_returnCommentsByUser() {
        List<Comment> commentObjs = List.of(mockComment(userA, activePost, null, true));
        List<CommentDto> expected = commentObjs.stream().map(CommentDto::new).toList();
        when(commentRepository.findAllByUserIdAndActiveTrue(userA.getId())).thenReturn(commentObjs);
        List<CommentDto> actual = commentService.getCommentsByUser(userA.getId());
        assertEquals(expected.size(), actual.size());
        assertEquals(expected, actual);
    }

    @Test
    void getCommentById_returnComment() {
        // active
        Comment comment = mockComment(userA, activePost, null, true);
        CommentDto expected = new CommentDto(comment);
        when(commentRepository.findById(comment.getId())).thenReturn(Optional.of(comment));
        CommentDto actual = commentService.getCommentById(comment.getId());
        assertEquals(expected, actual);
        // deleted, no content or user info
        when(commentRepository.findById(deletedComment.getId())).thenReturn(
            Optional.of(deletedComment)
        );
        CommentDto deletedActual = commentService.getCommentById(deletedComment.getId());
        assertEquals(false, deletedActual.getActive());
        assertNull(deletedActual.getContent());
        assertNull(deletedActual.getUserId());
    }

    @Test
    void getCommentById_throwResponseCodeException() {
        when(commentRepository.findById(Long.valueOf(1))).thenReturn(Optional.empty());
        ResponseCodeException ex = assertThrows(ResponseCodeException.class,
            () -> commentService.getCommentById(Long.valueOf(1)
        ));
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertEquals("Comment is not found", ex.getMessage());
    }

    @Test
    void createComment_nonExistentUser_success() {
        when(userService.getUser(Long.valueOf(1))).thenThrow(ResponseCodeException.class);
        assertThrows(ResponseCodeException.class, () -> commentService.createComment(
            new CreateCommentRequestDto(
                activePost.getId(),
                null,
                content,
                Long.valueOf(1)
            )
        ));
    }

    @Test
    void createComment_activePost_success() {
        Comment comment = mockComment(userA, activePost, null, true);
        CommentDto expected = new CommentDto(comment);
        when(userService.getUser(userA.getId())).thenReturn(userA);
        when(postService.getPost(activePost.getId())).thenReturn(activePost);
        CommentDto actual = commentService.createComment(
            new CreateCommentRequestDto(
                activePost.getId(),
                null,
                comment.getContent(),
                userA.getId()
            )
        );
        assertCommentDtoEquals(expected, actual);
    }

    @Test
    void createComment_nonExistentPost_throwResponseCodeException() {
        when(userService.getUser(userA.getId())).thenReturn(userA);
        when(postService.getPost(Long.valueOf(1))).thenThrow(ResponseCodeException.class);
        assertThrows(ResponseCodeException.class,
            () -> commentService.createComment(
                new CreateCommentRequestDto(
                    Long.valueOf(1),
                    null,
                    content,
                    userA.getId()
                )
            )
        );
    }

    @Test
    void createComment_deletedPost_throwResponseCodeException() {
        when(userService.getUser(userA.getId())).thenReturn(userA);
        when(postService.getPost(deletedPost.getId())).thenReturn(deletedPost);
        ResponseCodeException ex = assertThrows(ResponseCodeException.class,
            () -> commentService.createComment(
                new CreateCommentRequestDto(
                    deletedPost.getId(),
                    null,
                    content,
                    userA.getId()
                )
            )
        );
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertEquals("Post is not found", ex.getMessage());
    }

    @Test
    void createComment_activePostActiveParent_success() {
        Comment parent = mockComment(userA, activePost, null, true);
        Comment comment = mockComment(userA, activePost, parent, true);
        CommentDto expected = new CommentDto(comment);
        when(userService.getUser(userA.getId())).thenReturn(userA);
        when(commentRepository.findById(parent.getId())).thenReturn(Optional.of(parent));
        CommentDto actual = commentService.createComment(
            new CreateCommentRequestDto(
                activePost.getId(),
                parent.getId(),
                comment.getContent(),
                userA.getId()
            )
        );
        assertCommentDtoEquals(expected, actual);
    }

    @Test
    void createComment_deletedPostActiveParent_success() {
        Comment parent = mockComment(userA, deletedPost, null, true);
        Comment comment = mockComment(userA, deletedPost, parent, true);
        CommentDto expected = new CommentDto(comment);
        when(userService.getUser(userA.getId())).thenReturn(userA);
        when(commentRepository.findById(parent.getId())).thenReturn(Optional.of(parent));
        CommentDto actual = commentService.createComment(
            new CreateCommentRequestDto(
                activePost.getId(),
                parent.getId(),
                comment.getContent(),
                userA.getId()
            )
        );
        assertCommentDtoEquals(expected, actual);
    }

    @Test
    void createComment_nonExistentParent_throwResponseCodeException() {
        when(userService.getUser(userA.getId())).thenReturn(userA);
        when(commentRepository.findById(Long.valueOf(1))).thenReturn(Optional.empty());
        assertThrows(ResponseCodeException.class,
            () -> commentService.createComment(
                new CreateCommentRequestDto(
                    null,
                    Long.valueOf(1),
                    content,
                    userA.getId()
                )
            )
        );
    }

    @Test
    void createComment_deletedParent_throwResponseCodeException() {
        when(userService.getUser(userA.getId())).thenReturn(userA);
        when(commentRepository.findById(deletedComment.getId())).thenReturn(
            Optional.of(deletedComment)
        );
        ResponseCodeException ex = assertThrows(ResponseCodeException.class,
            () -> commentService.createComment(
                new CreateCommentRequestDto(
                    null,
                    deletedComment.getId(),
                    content,
                    userA.getId()
                )
            )
        );
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertEquals("Parent comment is not found", ex.getMessage());
    }

    @SneakyThrows
    @Test
    void updateComment_activeComment_success() {
        Comment comment = mockComment(userA, activePost, null, true);
        CommentDto expected = new CommentDto(comment);
        when(commentRepository.findById(comment.getId())).thenReturn(
            Optional.of(comment)
        );
        TimeUnit.MILLISECONDS.sleep(20);
        CommentDto actual = commentService.updateComment(comment.getId(),
            new UpdateCommentRequestDto(content)
        );
        assertEquals(expected.getId(), actual.getId());
        assertEquals(content, actual.getContent());
        assertNotEquals(expected.getLastModifiedDate(), actual.getLastModifiedDate());
    }

    @Test
    void updateComment_nonExistentComment_throwResponseCodeException() {
        when(commentRepository.findById(Long.valueOf(1))).thenReturn(
            Optional.empty()
        );
        ResponseCodeException ex = assertThrows(ResponseCodeException.class,
            () -> commentService.updateComment(Long.valueOf(1),
                new UpdateCommentRequestDto(content)
            )
        );
        assertEquals(HttpStatus.NOT_FOUND, ex.getStatusCode());
        assertEquals("Comment is not found", ex.getMessage());
    }

    @Test
    void updateComment_deletedComment_throwEntityDeletedException() {
        when(commentRepository.findById(deletedComment.getId())).thenReturn(
            Optional.of(deletedComment)
        );
        EntityDeletedException ex = assertThrows(EntityDeletedException.class,
            () -> commentService.updateComment(deletedComment.getId(),
                new UpdateCommentRequestDto(content)
            )
        );
        assertEquals("Comment has been deleted", ex.getMessage());
    }

    @Test
    void deleteComment_activeComment_success() {
        Comment comment = mockComment(userA, activePost, null, true);
        when(commentRepository.findById(comment.getId())).thenReturn(Optional.of(comment));
        commentService.deleteComment(comment.getId());
        assertEquals(false, comment.getActive());
    }

    @Test
    void deleteComment_nonExistentComment_success() {
        when(commentRepository.findById(Long.valueOf(1))).thenReturn(Optional.empty());
        assertDoesNotThrow(() -> commentService.deleteComment(Long.valueOf(1)));
    }

    @Test
    void deleteComment_deletedComment_success() {
        when(commentRepository.findById(deletedComment.getId())).thenReturn(
            Optional.of(deletedComment)
        );
        assertDoesNotThrow(() -> commentService.deleteComment(deletedComment.getId()));
    }

    // helpers

    private void assertCommentDtoEquals(CommentDto expected, CommentDto actual) {
        assertEquals(expected.getContent(), actual.getContent());
        assertEquals(expected.getPostId(), actual.getPostId());
        assertEquals(expected.getParentId(), actual.getParentId());
        assertEquals(expected.getUserId(), actual.getUserId());
    }
}
