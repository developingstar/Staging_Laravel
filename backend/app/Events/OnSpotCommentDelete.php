<?php

namespace App\Events;

use App\Comment;
use Illuminate\Queue\SerializesModels;

/**
 * Class OnSpotCommentDelete
 * @package App\Events
 *
 * Fires on spot comment delete
 */
class OnSpotCommentDelete extends Event implements Feedable
{
    use SerializesModels;

    /**
     * @var Comment
     */
    public $comment;

    /**
     * Create a new event instance.
     *
     * @param Comment $comment
     */
    public function __construct(Comment $comment)
    {
        $this->comment = $comment;
    }

    /**
     * {@inheritDoc}
     *
     * @return Comment
     */
    public function getFeedable()
    {
        return $this->comment;
    }

    /**
     * {@inheritDoc}
     *
     * @return \App\User
     */
    public function getFeedSender()
    {
        return $this->comment->sender;
    }
}
